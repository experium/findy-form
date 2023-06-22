import React, { Component, Fragment } from 'react';
import Modal from 'react-responsive-modal';
import { withTranslation } from 'react-i18next';
import { FormSpy } from 'react-final-form';
import { filter, find, map, path, pathOr, prop, pick } from 'ramda';

import { Checkbox } from './Checkbox';
import styles from '../../styles/index.module.css';
import HtmlOpdForm, { HtmlOpdFormClear } from './HtmlOpdForm';
import { FormContext } from '../../context/FormContext';
import { getAttrs } from '../../utils/attrs';

const getConstructorOpd = (opdSettings, pdaLanguage, language) => {
    const opdConstructor = pathOr([], ['data', 'opdConstructor'], opdSettings);

    const text = (opdConstructor || []).reduce((res, cur) => {
        switch (cur.type) {
            case 'question':
                return `${res}<input name="${cur.question}" placeholder="${path(['translations', pdaLanguage], cur) || path(['translations', language], cur) || cur.placeholder || ''}" type="text" ${cur.required ? 'required' : ''} /> `;
            case 'formated':
                return res + (path(['translations', pdaLanguage], cur) || path(['translations', language], cur) || cur.text || '');
            case 'checkbox':
                return `${res}<div>
                    <input type="checkbox" id="${`checkbox-${cur.id}`}" ${cur.required ? 'required="required"' : ''} />
                    <label for="${`checkbox-${cur.id}`}">${path(['translations', pdaLanguage], cur) || path(['translations', language], cur) || cur.label || ''}</label>
                </div>`;
            case 'opdCheckbox':
                return `${res}<div>
                    <input type="checkbox" id="${cur.opdType}" name="${cur.opdType}" data-separate-field="${cur.opdType}" ${path([cur.opdType, 'required'], opdSettings) ? 'required="required"' : ''} />
                    <label for="${cur.opdType}">${pathOr('', ['translations', pdaLanguage], cur) || pathOr('', ['translations', language], cur) || pathOr('', [cur.opdType, 'translations', language], opdSettings) || pathOr('', [cur.opdType, 'label'], opdSettings)}</label>
                </div>`;
            default:
                return res;
        }
    }, '');

    return `<div>
        ${text}
    </div>`;
};

class PersonalDataAgreementComponent extends Component {
    state = {
        opened: false,
        openedHtml: false
    };

    static defaultProps = {
        opdSettings: {}
    };

    open = event => {
        if (this.props.opd) {
            event.preventDefault();
            this.setState({ opened: true });
        }
    }

    close = () => this.setState({ opened: false });

    closeHtml = () => this.setState({ openedHtml: false });

    getLabel = () => {
        const { t, renderOpdLabel, opd, opdSettings, pdaLanguage, language } = this.props;
        const label = t('opdLabelCustom');
        const modalLinkProps = {
            className: opd ? styles.formLink : styles.withoutOpd,
            onClick: this.open
        };
        const linkText = path(['translations', 'labelLink', pdaLanguage], opdSettings) || pathOr(pathOr(t('opdLink'), ['labelLink'], opdSettings), ['translations', 'labelLink', language], opdSettings);
        const link = path(['translations', 'link', pdaLanguage], opdSettings) || pathOr(path(['link'], opdSettings), ['translations', 'link', language], opdSettings);
        const opdText = pathOr(['translations', 'text', pdaLanguage], opdSettings) || pathOr(opd, ['translations', 'text', language], opdSettings);
        const opdType = pathOr('modal', ['linkType'], opdSettings);

        return <span>
            { renderOpdLabel ? renderOpdLabel(modalLinkProps) :
                label !== 'opdLabelCustom' ? (
                    label
                ) : (
                    <Fragment>
                        { path(['translations', 'labelStart', pdaLanguage], opdSettings) || pathOr(pathOr(t('opdLabel'), ['labelStart'], opdSettings), ['translations', 'labelStart', language], opdSettings) }
                        { ' ' }
                        { opdType === 'modal' ?
                            <span {...modalLinkProps}>{ linkText }</span> :
                            <a href={`//${link}`} target='_blank'>{ linkText }</a>
                        }
                        { ' ' }
                        { path(['translations', 'labelEnd', pdaLanguage], opdSettings) || pathOr(pathOr('.', ['labelEnd'], opdSettings), ['translations', 'labelEnd', language], opdSettings) }
                    </Fragment>
                )
            }
            <Modal
                open={this.state.opened}
                onClose={this.close}
                classNames={{
                    modal: 'pda-modal',
                    closeButton: 'pda-modal-close-button',
                }}
                center
            >
                <div dangerouslySetInnerHTML={{ __html: opdText }} />
            </Modal>
        </span>;
    }

    onChange = () => {
        const { meta: { submitting } } = this.props;

        !submitting && this.setState({ openedHtml: true });
    }

    onSubmitHtml = (html, data) => {
        this.props.input.onChange(html ? {
            value: !!html,
            htmlContent: html,
            ...(data || {}),
        } : null);

        this.setState({ openedHtml: false });
    }

    getOpdValues = formProps => {
        const { opdSettings, getOpdValues, fields } = this.props;

        if (getOpdValues) {
            return getOpdValues(formProps);
        }

        if (path(['useConstructor'], opdSettings)) {
            return pick(
                filter(
                    field => find(i => i.type === 'question' && i.question === field, pathOr([], ['data', 'opdConstructor'], opdSettings)),
                    map(prop('field'), fields)
                ),
                formProps.values || {}
            );
        }

        return {};
    }

    isHtmlOpd = () => {
        const constructorOpd = path(['useConstructor'], this.props.opdSettings) ? getConstructorOpd(this.props.opdSettings, this.props.pdaLanguage, this.props.language) : null;
        return !!(this.props.htmlOpd || constructorOpd);
    }

    render() {
        const { opdSettings, pdaLanguage, language } = this.props;
        const isHtmlOpd = this.isHtmlOpd();
        const constructorOpd = path(['useConstructor'], opdSettings) ? getConstructorOpd(opdSettings, pdaLanguage, language) : null;

        return <FormContext.Consumer>{ ({ htmlAttrs }) => (
            <Fragment>
                <Checkbox
                    id={'opdCheckbox'}
                    {...this.props}
                    onValueChange={isHtmlOpd ? this.onChange : null}
                    options={[{
                        value: true,
                        label: this.getLabel()
                    }]}
                    htmlAttrs={getAttrs('opdCheckbox', htmlAttrs)}
                />
                { isHtmlOpd &&
                    <Fragment>
                        <FormSpy subscription={['values']}>
                            { formProps => (
                                <HtmlOpdFormClear
                                    open={this.state.openedHtml}
                                    value={this.props.input.value}
                                    values={this.getOpdValues(formProps)}
                                    onSubmitHtml={this.onSubmitHtml}
                                />
                            )}
                        </FormSpy>
                        <Modal
                            open={this.state.openedHtml}
                            onClose={this.closeHtml}
                            classNames={{
                                modal: 'pda-modal',
                                closeButton: 'pda-modal-close-button',
                            }}
                            destroyOnClose
                            showCloseIcon={false}
                            center
                        >
                            <FormSpy>
                                { formProps => (
                                    <HtmlOpdForm
                                        onSubmit={this.onSubmitHtml}
                                        onClose={this.closeHtml}
                                        value={this.props.input.value}
                                        formProps={formProps}
                                        formFields={this.props.fields}
                                        getOpdValues={() => this.getOpdValues(formProps)}
                                        htmlAttrs={htmlAttrs}
                                        html={this.props.htmlOpd || constructorOpd}
                                        htmlOpdStyles={this.props.htmlOpdStyles}
                                        acceptBtn={
                                            path(['translations', 'acceptButtonLabel', pdaLanguage], opdSettings)
                                            || pathOr(path(['acceptButtonLabel'], opdSettings), ['translations', 'acceptButtonLabel', language], opdSettings)
                                        } />
                                )}
                            </FormSpy>
                        </Modal>
                    </Fragment>
                }
            </Fragment>
        )}</FormContext.Consumer>;
    }
}

const PersonalDataAgreement = withTranslation()(PersonalDataAgreementComponent);

export default PersonalDataAgreement;

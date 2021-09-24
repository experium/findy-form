import React, { Component, Fragment } from 'react';
import Modal from 'react-responsive-modal';
import { withTranslation } from 'react-i18next';
import { FormSpy } from 'react-final-form';
import { filter, find, path, pathOr, pick, toLower } from 'ramda';

import 'rc-checkbox/assets/index.css';
import 'react-responsive-modal/styles.css';

import { Checkbox } from './Checkbox';
import styles from '../../styles/index.module.css';
import HtmlOpdForm from './HtmlOpdForm';
import { FormContext } from '../../context/FormContext';
import { getAttrs } from '../../utils/attrs';

const getConstructorOpd = (opdSettings, language) => {
    const opdConstructor = language && language !== 'ru' ? pathOr([], ['data', 'locale', language, 'opdConstructor'], opdSettings) : pathOr([], ['data', 'opdConstructor'], opdSettings);
    const checkboxes = language && language !== 'ru' ? pathOr([], ['data', 'locale', language, 'checkboxes'], opdSettings) : pathOr([], ['data', 'checkboxes'], opdSettings);

    const text = opdConstructor.reduce((res, cur) => {
        switch (cur.type) {
            case 'text':
                return `${res + cur.text} `;
            case 'question':
                return `${res}<input name="${cur.question}" placeholder="${cur.placeholder ? toLower(cur.placeholder) : ''}" type="text" ${cur.required ? 'required' : ''} /> `;
            case 'link':
                return `${res}<a href="${`//${cur.link}`}" target="_blank">${cur.text}</a> `;
            case 'formated':
                return res + cur.text;
            default:
                return res;
        }
    }, '');

    return `<div>
        ${text}
        ${path(['purposeCheckbox', 'active'], opdSettings) ? `<p><label><input name="opdPurpose" type="checkbox" data-separate-field="opdPurpose" ${path(['purposeCheckbox', 'required'], opdSettings) ? 'required' : ''} />${path(['purposeCheckbox', 'label'], opdSettings) || 'я выражаю согласие на обработку персональных данных для цели рассмотрения вопроса о моем трудоустройстве в Компании и включения в кадровый резерв Компании'}</label></p>` : ''}
        ${path(['acceptCheckbox', 'active'], opdSettings) ? `<p><label><input name="opdAccept" type="checkbox" data-separate-field="opdAccept" ${path(['acceptCheckbox', 'required'], opdSettings) ? 'required' : ''} />${path(['acceptCheckbox', 'label'], opdSettings) || 'я выражаю согласие на передачу моих персональных данных в организацию'}</label></p>` : ''}
        ${path(['transmissionCheckbox', 'active'], opdSettings) ? `<p><label><input name="transmission" type="checkbox" data-separate-field="transmission" ${path(['transmissionCheckbox', 'required'], opdSettings) ? 'required' : ''} />${path(['transmissionCheckbox', 'label'], opdSettings) || 'я выражаю согласие на трансграничную передачу моих персональных данных'}</label></p>` : ''}
        ${path(['mailingCheckbox', 'active'], opdSettings) ? `<p><label><input name="mailing" type="checkbox" data-separate-field="mailing" ${path(['mailingCheckbox', 'required'], opdSettings) ? 'required' : ''} />${path(['mailingCheckbox', 'label'], opdSettings) || 'я выражаю согласие на получение рассылки материалов рекламного и/или информационного характера посредством SMS-сервисов, Viber, WhatsApp, Telegram, Skype и других месcенджеров, электронной почты и т.д.'}</label></p>` : ''}
        ${filter(i => !!i.show, checkboxes).reduce((res, cur, index) => `${res}<p><label><input name="checkbox-${index}" type="checkbox" ${cur.required ? 'required' : ''} />${cur.label}</label></p>`, '')}
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
        const { t, renderOpdLabel, opd, opdSettings, language } = this.props;
        const label = t('opdLabelCustom');
        const modalLinkProps = {
            className: opd ? styles.formLink : styles.withoutOpd,
            onClick: this.open
        };
        const linkText = pathOr(pathOr(t('opdLink'), ['labelLink'], opdSettings), ['translations', 'labelLink', language], opdSettings);
        const link = pathOr(path(['link'], opdSettings), ['translations', 'link', language], opdSettings);
        const opdText = pathOr(opd, ['translations', 'text', language], opdSettings);
        const opdType = pathOr('modal', ['linkType'], opdSettings);

        return <span>
            { renderOpdLabel ? renderOpdLabel(modalLinkProps) :
                label !== 'opdLabelCustom' ? (
                    label
                ) : (
                    <Fragment>
                        { pathOr(pathOr(t('opdLabel'), ['labelStart'], opdSettings), ['translations', 'labelStart', language], opdSettings) }
                        { ' ' }
                        { opdType === 'modal' ?
                            <span {...modalLinkProps}>{ linkText }</span> :
                            <a href={`//${link}`} target='_blank'>{ linkText }</a>
                        }
                        { ' ' }
                        { pathOr(pathOr('.', ['labelEnd'], opdSettings), ['translations', 'labelEnd', language], opdSettings) }
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
        this.props.input.onChange({
            value: !!html,
            htmlContent: html,
            data,
        });
        this.setState({ openedHtml: false });
    }

    getOpdValues = formProps => {
        const { opdSettings, getOpdValues } = this.props;

        if (getOpdValues) {
            return getOpdValues(formProps);
        }

        if (path(['useConstructor'], opdSettings)) {
            return pick(filter(field => find(i => i.type === 'question' && i.question === field, pathOr([], ['data', 'opdConstructor'], opdSettings)), [
                'firstName', 'lastName', 'middleName', 'phone', 'email', 'district', 'address', 'webpage', 'messanger', 'birthDate'
            ]), formProps.values);
        }

        return {};
    }

    render() {
        const { opdSettings, language } = this.props;
        const constructorOpd = path(['useConstructor'], opdSettings) ? getConstructorOpd(opdSettings, language) : null;

        return <FormContext.Consumer>{ ({ htmlAttrs }) => (
            <Fragment>
                <Checkbox
                    id={'opdCheckbox'}
                    {...this.props}
                    onValueChange={(this.props.htmlOpd || constructorOpd) ? this.onChange : null}
                    options={[{
                        value: true,
                        label: this.getLabel()
                    }]}
                    htmlAttrs={getAttrs('opdCheckbox', htmlAttrs)}
                />
                { (this.props.htmlOpd || constructorOpd) &&
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
                                    getOpdValues={() => this.getOpdValues(formProps)}
                                    htmlAttrs={htmlAttrs}
                                    html={this.props.htmlOpd || constructorOpd}
                                    acceptBtn={pathOr(path(['acceptButtonLabel'], opdSettings), ['translations', 'acceptButtonLabel', language], opdSettings)} />
                            )}
                        </FormSpy>
                    </Modal>
                }
            </Fragment>
        )}</FormContext.Consumer>;
    }
}

const PersonalDataAgreement = withTranslation()(PersonalDataAgreementComponent);

export default PersonalDataAgreement;

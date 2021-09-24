import React, { Component, Fragment } from 'react';
import { withTranslation } from 'react-i18next';
import { all, forEach, is, path, trim } from 'ramda';
import cx from 'classnames';

import styles from '../../styles/index.module.css';

import { getAttrs } from '../../utils/attrs';
import { EMAIL_EXPERIUM } from '../../constants/regexps';

const commonStyle = `
    .opd-html-form {
        line-height: 20px;
    }
    .opd-html-form input {
        border: none;
        border-bottom: 1px solid #000;
        font-size: 16px;
        pointer-events: auto;
    }
    .opd-html-form label {
        pointer-events: auto;
    }
    .opd-html-form input:focus {
        outline: none;
    }
    .opd-html-form.submitted input:invalid {
        border-bottom: 1px solid red;
    }
    .opd-html-form input[type="checkbox"] {
        position: relative;
        margin-right: 10px;
    }
    .opd-html-form input[type="checkbox"]:required::after {
        content: "*";
        color: red;
        top: -6px;
        right: -8px;
        position: absolute;
    }
    .opd-html-form.submitted input[type="checkbox"]:invalid {
        outline: 1px solid red;
    }
`;

export const getHtml = body => `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>OPD</title>
            <style>
                ${commonStyle}
                .opd-html-form {
                    font-family: Arial;
                    font-size: 16px;
                }
                .opd-html-form input,
                .opd-html-form label {
                    pointer-events: none;
                }
                .opd-html-form input[type="checkbox"]:required::after {
                    content: "";
                }
                .form-button {
                    display: none;
                }
            </style>
        </head>
        <body>
            <div style="margin: 10px auto; max-width: 1080px;">
                ${body}
            </div>
        </body>
    </html>
`;

class HtmlOpdForm extends Component {
    state = {
        submitted: false,
        value: null
    };

    componentDidMount() {
        const { value } = this.props;

        if (value && is(String, value.htmlContent)) {
            const el = this.valueHtml.querySelector('.opd-html-form');

            this.setState({ value: el ? el.innerHTML : null });
        } else {
            this.setValues();
        }
    }

    setValues = () => {
        const values = this.props.getOpdValues();
        const inputs = this.form.querySelectorAll('input');

        forEach(input => {
            const value = path([input.name], values);
            if (value) {
                input.setAttribute('value', trim(`${value || ''}`));
            }
        }, inputs);
    }

    scrollToInvalid = () => {
        const invalidInput = document.querySelector('.opd-html-form input:invalid');
        const container = document.querySelector('.react-responsive-modal-overlay');

        if (invalidInput) {
            invalidInput.focus({
                preventScroll: true
            });

            container.scrollTo({
                top: (invalidInput.getBoundingClientRect().top + container.scrollTop) - 10,
                behavior: 'smooth'
            });
        }
    }

    onSubmit = formProps => {
        const form = path(['form'], formProps);
        const inputs = this.form.querySelectorAll('input');
        const valid = all(input => {
            if ((input.type === 'email') && !EMAIL_EXPERIUM.test(input.value)) {
                input.setCustomValidity('Incorrect email');
                return false;
            } else {
                input.setCustomValidity('');
            }
            return input.validity.valid;
        }, inputs);

        this.setState(() => ({ submitted: true }), () => this.scrollToInvalid());

        if (valid) {
            const values = {};

            forEach(input => {
                if (input.type === 'checkbox') {
                    if (input.checked) {
                        input.setAttribute('checked', input.checked);
                    } else {
                        input.removeAttribute('checked');
                    }
                } else {
                    input.setAttribute('value', input.value);
                }

                const separateField = input.getAttribute('data-separate-field');

                if (separateField) {
                    const value = input.type === 'checkbox' ? input.checked : input.value;
                    values[separateField] = value;
                    form.change(separateField, value);
                }
            }, inputs);

            this.props.onSubmit(getHtml(this.form.innerHTML), values);
        }
    }

    render() {
        const { formProps, t, htmlAttrs, onClose, acceptBtn } = this.props;
        const html = this.state.value || this.props.html;

        return <Fragment>
            <div>
                <div ref={node => this.valueHtml = node} style={{ display: 'none' }} dangerouslySetInnerHTML={{ __html: path(['value', 'htmlContent'], this.props) }} />
                <style>{commonStyle}</style>
                <form className='personalDataAgreementForm' ref={node => this.form = node}>
                    <button onClick={onClose} type='button' className='form-button react-responsive-modal-closeButton pda-modal-close-button' data-testid='close-button' {...getAttrs('opdClose', htmlAttrs)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 36 36" data-testid="close-icon"><path d="M28.5 9.62L26.38 7.5 18 15.88 9.62 7.5 7.5 9.62 15.88 18 7.5 26.38l2.12 2.12L18 20.12l8.38 8.38 2.12-2.12L20.12 18z"></path></svg>
                    </button>

                    <div className={cx('opd-html-form', { submitted: this.state.submitted })} dangerouslySetInnerHTML={{ __html: html }} />

                    <button className={`${styles.formBtn} form-button`} type='button' onClick={() => this.onSubmit(formProps)} {...getAttrs('opdAccept', htmlAttrs)}>
                        { acceptBtn || t('opdFormAccept') }
                    </button>
                </form>
            </div>
        </Fragment>;
    }
}

export default withTranslation()(HtmlOpdForm);

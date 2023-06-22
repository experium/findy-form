import React, { Component, Fragment } from 'react';
import { withTranslation } from 'react-i18next';
import { all, equals, join, find, forEach, map, includes, is, path, propEq, trim } from 'ramda';
import cx from 'classnames';

import styles from '../../styles/index.module.css';

import { getAttrs } from '../../utils/attrs';
import { EMAIL_EXPERIUM } from '../../constants/regexps';

const commonStyle = `
    .opd-html-form {
        line-height: 20px;
        margin-bottom: 24px;
    }
    .opd-html-form input {
        border: none;
        border-bottom: 1px solid #000;
        font-size: 16px;
        pointer-events: auto;
        margin: 4px 0;
        appearance: none;
        -moz-appearance: none;
        -webkit-appearance: none;
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
    .opd-html-form label{
        cursor: pointer;
    }
    .opd-html-form input[type="checkbox"] {
        position: relative;
        margin-right: 8px;
        margin-bottom: -2px;
        border: 1px solid #ccc;
        appearance: none;
        width: 18px;
        height: 18px;
        border-radius: 2px;
    }
    .opd-html-form input[type="checkbox"]:checked {
        background: #3a70bb;
        border-color: #3a70bb;
    }
    .opd-html-form input[type="checkbox"]:checked:before {
        background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAA21JREFUaEPtmF3oVUUUxX+rsOiD6MMgiSQMIYIyEE3wIzERBQmzIKiwBCnxwUTEerAX66UkwkwoiCALIujLIKO0IoIKKnqoXrTHfMgHQ8oEy5ZsHU2u556Zc/733v/9w53Xs2Zmrb337DVzxAQfmuD8GQkY7wyOMjDKQEcEbC8G3gR2As9Icl2QhqqEbN8A/ABcm0jvAR6S9Ec3EUMjwPYk4AtgbgfZX4GVkn6qEjFMAl4GHusS6b+ANZLe7vw+FAJsrwJezzSEOAv3SXrvXNy4C7A9A/gGuCQj4AQwX1Jgz45xFWD7SuB74KaCdvykpGeHpoRsR/DeBe4pIP8hsKKqpY5bBmxvAZ4uIH8AmCXpyNB0Idt3AZ8AF2YEHIu2KunHofGBCrOq0/CIpNruNNASsn0x8FWUREHp7JC0PocbtIBXgEdzpIBvgTslHc9hBybA9oPpkpbjdAiYKem3HDC+D0SA7duSWV1aYFbLJO0tIT8QAbavAr4rNKsnJD1XSr5IQDKctVGXde2salPbFwC7geUFpN4H7s3d/xs7se1twCbgKHC3pM8LyJyC2H4K2FqArzWruvm1Z8B2OGU45pnxd1i/pE9zpBqYVQRmjqSfc2s2cmLbG4AXKiZFa7tf0gfdNrQ9Nb2sJheQeljSrgJcJaQyA7bXAS/VdKl/gAckvdO5akOzelHS423JVx5i20uAj4E4gHXjX2C1pHiAnx22S83qa2ChpAhG63FeBmwvAKIPX1Sw6n/xDJT0ajq0q4HXCub9nszqYAG2FtKthJalu3rulXSKN7AxPcgjqj03qzoFXbtQ6iLRwy8rjNJh4OoC7GZJ0Zp7MnJtdB7wEXBFT3Y7bWrRhmt/VjXZK3sXsj0zPT6uabJwBXY/MLvby6rt2lkB6XDeAuwDprTcKMzqDkm/tJzfdVqRgCTi5iTi+hYkVkl6o8W87JRiAUnEjcBnwLTsyv8DtksKV+/LaCQgiYhrQpTT9AJG8RMqzCr7sipYqxLSWEAScR0QF7pbazbumVnViWslIImIX+Ah4vaKDeKasVjSl20jWzqvtYAkIn4Nxr1pTseGmyQ9X0piLLgxCUgiLk+vrkWJSM/Nqi8ldO6ituO68RYQZrdU0p9jiWqTuWPOQJPN+oEdCehHVJusOcpAk2j1AzvhM3ASm876Mart7QEAAAAASUVORK5CYII=");
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        content: '';
        display: table-cell;
        border-top: 0;
        border-left: 0;
        width: 16px;
        height: 16px;
        background-size: 12px;
        background-repeat: no-repeat;
        background-position: center;
    }
    .opd-html-form input[type="checkbox"]:required::after {
        content: "*";
        color: red;
        top: -6px;
        right: -8px;
        position: absolute;
    }
    .opd-html-form.submitted input[type="checkbox"]:invalid {
        border-color: red;
    }
    .opd-html-form > div > div {
        margin: 4px 0;
    }
    .opd-html-form > div p {
        display: inline-block;
        margin: 4px 0;
    }
    .opd-html-form > div p + p {
        display: block;
    }
`;

export const getHtml = (body, customStyles) => `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>OPD</title>
            <style>
                ${customStyles || ''}
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
            </style>
        </head>
        <body>
            <div style="margin: 10px auto; max-width: 1080px;">
                ${body}
            </div>
        </body>
    </html>
`;

const TEXT_FIELDS = ['text', 'email', 'phone', 'date'];
const SELECT_FIELDS = ['dictionary', 'company_dictionary', 'list', 'city', 'country', 'region', 'money'];
const OPD_DATA_CHECKBOXES = {
    'accept': 'accept',
    'acceptCheckbox': 'accept',
    'opdAccept': 'accept',
    'purpose': 'purpose',
    'purposeCheckbox': 'purpose',
    'opdPurpose': 'purpose',
    'mailing': 'mailing',
    'mailingCheckbox': 'mailing',
    'transmission': 'transmission',
    'transmissionCheckbox': 'transmission',
};

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
            const value = trim(`${path([input.name], values) || ''}`);

            if (value) {
                const field = find(propEq('field', input.name), this.props.formFields);

                if (!field || includes(field.type, TEXT_FIELDS)) {
                    input.value = value;
                    input.setAttribute('value', value);
                } else if (field && includes(field.type, SELECT_FIELDS)) {
                    const selectValue = path(['settings', 'multiple'], field)
                        ? path(['settings', 'checkboxes'], field)
                            ? join(', ', map(el => path(['innerHTML'], el), document.querySelectorAll(`#field-${input.name} .rc-checkbox-checked + .checkbox-label`)))
                            : join(', ', map(el => path(['innerHTML'], el), document.querySelectorAll(`#field-${input.name} .jobot-forms-rc-select-selection-item-content`)))
                        : path(['settings', 'checkboxes'], field)
                            ? path(['innerHTML'], document.querySelector(`#field-${input.name} .rc-checkbox-checked + .radio-label`))
                            : path(['innerHTML'], document.querySelector(`#field-${input.name} .jobot-forms-rc-select-selection-item`));

                    if (field.type === 'money') {
                        const inputValue = document.querySelector(`#field-${input.name} input#${input.name}`).value;
                        const moneyValue = `${inputValue || ''} ${selectValue || ''}`;
                        input.value = moneyValue;
                        input.setAttribute('value', moneyValue);
                    } else if (selectValue) {
                        input.value = selectValue;
                        input.setAttribute('value', selectValue);
                    }
                }
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
        const { htmlOpdStyles } = this.props;
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

                    const field = find(propEq('field', input.name), this.props.formFields);
                    if (field && includes(field.type, TEXT_FIELDS)) {
                        form.change(input.name, input.value);
                    }
                }

                const separateField = input.getAttribute('data-separate-field');

                if (separateField) {
                    const value = input.type === 'checkbox' ? input.checked : input.value;
                    const id = OPD_DATA_CHECKBOXES[separateField];
                    values[id] = value;
                    form.change(separateField, value);
                }

                const fixedField = OPD_DATA_CHECKBOXES[input.getAttribute('id')];
                if (fixedField) {
                    const value = input.type === 'checkbox' ? input.checked : input.value;
                    values[separateField] = value;
                }
            }, inputs);

            this.props.onSubmit(getHtml(this.form.innerHTML, htmlOpdStyles), values);
        }
    }

    render() {
        const { formProps, t, htmlAttrs, htmlOpdStyles, onClose, acceptBtn } = this.props;
        const html = this.state.value || this.props.html;

        return <Fragment>
            <div>
                <div ref={node => this.valueHtml = node} style={{ display: 'none' }} dangerouslySetInnerHTML={{ __html: path(['value', 'htmlContent'], this.props) }} />
                <style>
                    {htmlOpdStyles || ''}
                    {commonStyle}
                </style>
                <button onClick={onClose} type='button' className='form-button react-responsive-modal-closeButton pda-modal-close-button' data-testid='close-button' {...getAttrs('opdClose', htmlAttrs)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 36 36" data-testid="close-icon"><path d="M28.5 9.62L26.38 7.5 18 15.88 9.62 7.5 7.5 9.62 15.88 18 7.5 26.38l2.12 2.12L18 20.12l8.38 8.38 2.12-2.12L20.12 18z"></path></svg>
                </button>
                <form className='personalDataAgreementForm' ref={node => this.form = node}>
                    <div className={cx('opd-html-form', { submitted: this.state.submitted })} dangerouslySetInnerHTML={{ __html: html }} />
                </form>
                <button className={`${styles.formBtn} form-button`} type='button' onClick={() => this.onSubmit(formProps)} {...getAttrs('opdAccept', htmlAttrs)}>
                    { acceptBtn || t('opdFormAccept') }
                </button>
            </div>
        </Fragment>;
    }
}

export class HtmlOpdFormClear extends Component {
    componentDidUpdate(prevProps) {
        if (prevProps.value && !prevProps.open && !equals(prevProps.values, this.props.values)) {
            this.props.onSubmitHtml();
        }
    }

    render() {
        return null;
    }
}

export default withTranslation()(HtmlOpdForm);

import React, { Component } from 'react';
import Masked from 'react-text-mask';
import { path } from 'ramda';
import FlagedInput from 'react-phone-input-2';
import ru from 'react-phone-input-2/lang/ru.json';
import 'react-phone-input-2/lib/style.css';

import '../../styles/masked-input.css';
import styles from '../../styles/index.module.css';

import withFieldWrapper from '../hocs/withFieldWrapper';
import { getPhoneMaskRU } from '../../utils/mask';

class MaskedInput extends Component {
    render() {
        const { input: { value, name }, settings: { keepCharPositions = false, guide = true }, onChange, mask, disabled, placeholder } = this.props;

        return <Masked
            id={name}
            disabled={disabled}
            className={`${styles.formInput} input`}
            value={value || ''}
            onChange={onChange}
            mask={mask}
            placeholderChar={'\u2000'}
            placeholder={placeholder}
            keepCharPositions={keepCharPositions}
            guide={guide}
        />;
    }
}

const languages = {
    et: 'ee',
    en: false
};

const PhoneInput = withFieldWrapper(props => {
    const { input: { value, name }, onChange, disabled, placeholder, language, languageOrigin } = props;

    return path(['settings', 'international'], props) ? (
        <FlagedInput
            key={language}
            id={name}
            name={name}
            className={`${styles.formInput} input`}
            disabled={disabled}
            country={languages[languageOrigin || language] || languageOrigin || language}
            preferredCountries={['ru', 'by', 'ua', 'kz', 'uz', 'tj', 'lv', 'lt', 'ee']}
            localization={language === 'ru' ? ru : undefined}
            value={value}
            placeholder={placeholder}
            onChange={(value, country, e, formattedValue) => onChange(formattedValue)}
            preserveOrder={['onlyCountries']}
            countryCodeEditable={false}
            masks={{
                tj: '(...) ..-..-..',
                uz: '...-...-...',
                lv: '(..) ..-..-..',
                lt: '(..) ..-..-..',
                ee: '(..) ......',
            }}
        />
    ) : (
        <MaskedInput
            {...props}
            mask={getPhoneMaskRU}
            showMask={true}
            placeholder='+'
        />
    );
});

export default PhoneInput;

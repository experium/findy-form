import React, { Component } from 'react';
import { Field } from 'react-final-form';
import { path } from 'ramda';

class LinkedFieldWatcher extends Component {
    componentDidUpdate(prev) {
        const { value, fieldName, linkType, linkValue } = this.props;

        if (prev.value !== value) {
            const isHidding = linkType === 'hide' || linkType === 'show';
            const valueMatch = value === linkValue;
            const needClear = (isHidding && !valueMatch) || (isHidding && valueMatch);

            if (fieldName && needClear) {
                this.props.form.change(fieldName, undefined);
            }
        }
    }

    render() {
        return this.props.children;
    }
}

class LinkedFieldWrapper extends Component {
    render() {
        const { field, fieldName, form, children } = this.props;
        const linkField = path(['settings', 'linkField'], field);
        const linkType = path(['settings', 'linkType'], field);
        const linkValue = path(['settings', 'linkValue'], field);
        const required = field.required;
        const parent = `${fieldName || ''}`.replace(field.field, '');

        return (
            <Field name={`${parent}${linkField}`} subscription={{ value: true }}>
                { ({ input: { value } }) => (
                    <LinkedFieldWatcher value={value} field={field} fieldName={fieldName} form={form} linkType={linkType} linkValue={linkValue}>
                        {(linkType === 'hide') ? (
                            value === linkValue ? children({ required }) : null
                        ) : (linkType === 'show') ? (
                            value !== linkValue ? children({ required }) : null
                        ) : (
                            value !== linkValue ? children({ required: false }) : children({ required: true })
                        )}
                    </LinkedFieldWatcher>
                )}
            </Field>
        );
    }
}

export default LinkedFieldWrapper;

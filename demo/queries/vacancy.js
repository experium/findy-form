import gql from 'graphql-tag';

export const getVacancy = gql(`
    query getVacancy($id: String!) {
        vacancy(id: $id) {
            id,
            title,
            pda,
            questions {
                field,
                type,
                label,
                settings,
                required,
                translations
            },
            translations,
            company {
                id,
                companySettings {
                    allowFileExtensions,
                    captcha {
                        landings,
                        domains
                    }
                },
                pdaSettings {
                    text,
                    labelStart,
                    labelEnd,
                    labelLink,
                    linkType,
                    link,
                    textAdditional,
                    labelAdditionalStart,
                    labelAdditionalEnd,
                    labelAdditionalLink,
                    linkTypeAdditional,
                    linkAdditional,
                    translations,
                    data,
                    acceptButtonLabel,
                    acceptCheckbox {
                        required,
                        active,
                        label
                    },
                    purposeCheckbox {
                        required,
                        active,
                        label
                    },
                    mailingCheckbox {
                        required,
                        active,
                        label
                    },
                    transmissionCheckbox {
                        required,
                        active,
                        label
                    },
                    useConstructor
                }
            },
            formPreset {
                options {
                    captchaType,
                    captchaToken,
                    captchaData
                }
            }
        }
    }
`);

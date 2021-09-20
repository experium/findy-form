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
                    translations,
                    labelStart,
                    labelEnd,
                    labelLink,
                    linkType,
                    link
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

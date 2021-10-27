import { pathEq } from 'ramda';

export const isError = (error, serverErrors) => (
    !!pathEq(['graphQLErrors', 0, 'message'], error, serverErrors)
    || !!pathEq(['data', 'message'], error, serverErrors)
    || !!pathEq(['message'], error, serverErrors)
);

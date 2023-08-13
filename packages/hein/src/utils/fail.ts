import { AssertionError } from 'hein-assertion-utils';

/**
 * Throw an AssertionError
 * @param  message - The message to pass to the AssertionError
 */
export const fail = (message = 'Fail') => {
    throw new AssertionError(undefined, undefined, message);
};

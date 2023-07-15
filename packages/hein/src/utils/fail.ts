import { AssertionError } from 'hein-assertion-utils';

/**
 * Throw an AssertionError
 * @param {string} message - The message to pass to the AssertionError
 */
export const fail = (message?: string) => {
    throw new AssertionError(undefined, undefined, message);
};

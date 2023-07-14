import { AssertionError } from 'hein-assertion-utils';

/**
 * Throw an AssertionError
 */
export const fail = (message?: string) => {
    throw new AssertionError(undefined, undefined, message);
};

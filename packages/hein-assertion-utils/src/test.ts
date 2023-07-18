import { AssertionError } from './assertions';
import { doesNotMatch } from 'node:assert/strict';

describe('AssertionError', () => {
    it('should remove this module from stack', () => {
        const error = new AssertionError(1, 2, 'TestError');
        doesNotMatch(error.stack, /hein-assertion-utils/);
    });
    it('should not freak out in case of a foreach loop', () => {
        // eslint-disable-next-line unicorn/no-array-for-each
        [1].forEach(() => {
            const error = new AssertionError(1, 2, 'TestError');
            doesNotMatch(error.stack, /hein-assertion-utils/);
        });
    });
});

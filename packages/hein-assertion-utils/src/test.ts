import { AssertionError, format } from './assertions.js';
import { doesNotMatch, equal } from 'node:assert/strict';

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

    it('should not escape html characters', () => {
        const error = format('TestError <div> {{= it.span }}', { span: '<span>' }, true);
        equal(error, 'TestError <div> <span>');
    });
});

import { AssertionError } from './assertions';
import { doesNotMatch } from 'node:assert/strict';

describe('AssertionError', () => {
    it('should remove this module from stack', () => {
        const error = new AssertionError(1, 2, 'TestError');
        doesNotMatch(error.stack, /hein-assertion-utils/);
    });
});

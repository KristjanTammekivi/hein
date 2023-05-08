import { endsWith, notEndsWith, throws } from '../assert';

describe('assert/endsWith', () => {
    it('should not throw if string ends with value', () => {
        endsWith('abc', 'c');
    });
    it('should throw if string does not end with value', () => {
        throws(() => {
            endsWith('abc', 'b');
        }, /Expected 'abc' to end with 'b'/);
    });
    describe('not', () => {
        it('should throw if string ends with value', () => {
            throws(() => {
                notEndsWith('abc', 'c');
            }, /Expected 'abc' to not end with 'c'/);
        });
        it('should not throw if string does not end with value', () => {
            notEndsWith('abc', 'b');
        });
    });
});

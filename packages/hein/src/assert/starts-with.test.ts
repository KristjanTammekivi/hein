import { notStartsWith, startsWith, throws } from '../assert';

describe('assert/startsWith', () => {
    it('should not throw if string starts with value', () => {
        startsWith('abc', 'a');
    });
    it('should throw if string does not start with value', () => {
        throws(() => {
            startsWith('abc', 'b');
        }, /Expected 'abc' to start with 'b'/);
    });
    describe('not', () => {
        it('should throw if string starts with value', () => {
            throws(() => {
                notStartsWith('abc', 'a');
            }, /Expected 'abc' to not start with 'a'/);
        });
        it('should not throw if string does not start with value', () => {
            notStartsWith('abc', 'b');
        });
    });
});

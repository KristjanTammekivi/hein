import { hasKeys, notHasKeys, throws } from '../assert';

describe('hasKeys', () => {
    it('should not throw if object has keys', () => {
        hasKeys({ a: 1 }, 'a');
    });
    it('should throw if object does not have a key', () => {
        throws(() => hasKeys({ a: 1 }, 'b' as any));
    });
    it('should throw if one key exists but the other does not', () => {
        throws(
            () => hasKeys({ a: 1 }, ['a', 'b'] as any),
            (error) => error.message === `Expected '{ a: 1 }' to have keys [ 'a', 'b' ]`
        );
    });
    it('should not throw if all keys exist', () => {
        hasKeys({ a: 1, b: 2 }, ['a', 'b']);
    });
    describe('notHasKeys', () => {
        it('should not throw if object does not have keys', () => {
            notHasKeys({ a: 1 }, 'b' as any);
        });
        it('should throw if object has keys', () => {
            throws(
                () => notHasKeys({ a: 1 }, 'a'),
                (error) => error.message === `Expected '{ a: 1 }' to not have keys [ 'a' ]`
            );
        });
    });
});

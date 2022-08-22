import { hasProperty, notHasProperty, throws } from '../assert';

describe('assert/hasProperty', () => {
    it('should not throw if object has property', () => {
        hasProperty({ a: 1 }, 'a');
    });
    it('should throw if object does not have a property', () => {
        throws(() => {
            // @ts-expect-error intentionally wrong type
            return hasProperty({ a: 1 }, 'b');
        }, /Expected { a: 1 } to have property b/);
    });
    it('should not throw if object has property and the value is correct', () => {
        hasProperty({ a: 1 }, 'a', 1);
    });
    it('should throw if object has property but provided value does not match', () => {
        throws(() => {
            hasProperty({ a: 1 }, 'a', 2);
        }, /Expected { a: 1 } to have property a with value 2/);
    });
    describe('assert/notHasProperty', () => {
        it('should not throw if property is not present', () => {
            // @ts-expect-error intentionally wrong type
            notHasProperty({ a: 1 }, 'b');
        });
        it('should throw if property is present', () => {
            throws(() => {
                notHasProperty({ a: 1 }, 'a');
            }, /Expected { a: 1 } to not have property a/);
        });
        it('should not throw if object has property but the value is incorrect', () => {
            notHasProperty({ a: 1 }, 'a', 2);
        });
        it('should throw if property is present and value is correct', () => {
            throws(() => notHasProperty({ a: 1 }, 'a', 1), /Expected { a: 1 } to not have property 'a' with value 1/);
        });
    });
});

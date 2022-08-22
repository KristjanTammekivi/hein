import { expect } from '../expect';

describe('expect/property', () => {
    it('should not throw if object has property', () => {
        expect({ a: 1 }).to.have.property('a');
    });
    it('should throw if object has property but value is incorrect', () => {
        expect(() => {
            expect({ a: 1 }).to.have.property('a', 2);
        }).to.throw(/Expected { a: 1 } to have property a with value 2/);
    });
    describe('not', () => {
        it(`should not throw if object doesn't have property`, () => {
            // @ts-expect-error wrong key on purpose
            expect({ a: 1 }).to.not.have.property('b');
        });
    });
});

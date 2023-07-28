import { throws } from '../assert';
import { expect } from '../expect';

describe('expect/throw', () => {
    it(`should throw if the callback doesn't throw`, () => {
        throws(() => expect(() => {}).to.throw());
    });
    it('should not throw if callback throws', () => {
        expect(() => {
            throw new Error('Things are bad');
        }).to.throw();
    });
    it('should accept arguments', () => {
        class CustomError extends Error {}
        const callback = () => {
            throw new Error();
        };
        throws(() => expect(callback).to.throw(CustomError), /Expected function to throw CustomError/);
    });
    describe('not', () => {
        it(`should not throw if callback doesn't throw and it's inverted`, () => {
            expect(() => expect(() => {}).not.to.throw()).not.to.throw();
        });
        it(`should throw if callback throws and it's inverted`, () => {
            throws(() =>
                expect(() => {
                    throw new Error('Things are bad');
                }).not.to.throw()
            );
        });
    });
});

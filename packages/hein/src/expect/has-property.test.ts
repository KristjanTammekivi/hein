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
            expect({ a: 1 }).to.not.have.property('b');
        });
    });

    describe('deep', () => {
        it('should not throw if object has deep property', () => {
            expect({ a: { b: { c: 1 } } }).to.have.deep.property('a.b.c', 1);
        });

        it('should throw if object has deep property but value is different', () => {
            expect(() => {
                expect({ a: { b: { c: 1 } } }).to.have.deep.property('a.b.c', 2);
            }).to.throw(/Expected { a: { b: { c: 1 } } } to have property a.b.c with value 2/);
        });

        describe('not', () => {
            it(`should not throw if object doesn't have deep property`, () => {
                expect({ a: { b: { c: 1 } } }).to.not.have.deep.property('d.e.f', 1);
            });

            it('should throw if object has deep property', () => {
                expect(() => {
                    expect({ a: { b: { c: 1 } } }).to.not.have.deep.property('a.b.c', 1);
                }).to.throw(/Expected { a: { b: { c: 1 } } } to not have property a.b.c with value 1/);
            });
        });
    });
});

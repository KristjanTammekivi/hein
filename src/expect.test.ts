import { throws } from './assert';
import { expect } from './expect';

describe('expect', () => {
    describe('throw', () => {
        it(`should throw if the callback doesn't throw`, () => {
            throws(() => expect(() => {}).to.throw());
        });
        it('should not throw if callback throws', () => {
            expect(() => {
                throw new Error('Things are bad');
            }).to.throw();
        });
        it('should accept arguments', () => {
            class CustomError extends Error { }
            const cb = () => { throw new Error(); };
            throws(() => expect(cb).to.throw(CustomError), /Expected function to throw CustomError/);
        });
        describe('not', () => {
            it(`should not throw if callback doesn't throw and it's inverted`, () => {
                expect(() => expect(() => {}).not.to.throw()).not.to.throw();
            });
            it(`should throw if callback throws and it's inverted`, () => {
                throws(() => expect(() => {
                    throw new Error('Things are bad');
                }).not.to.throw());
            });
        });
    });

    describe('equal', () => {
        it('should not throw for strict equality', () => {
            expect(1).to.equal(1);
        });
        it('should throw if values are not equal', () => {
            expect(() => {
                // @ts-expect-error intentionally wrong type
                expect(1).to.equal('a');
            }).to.throw();
        });
        it('should throw if values are only deep equal', () => {
            expect(() => {
                expect({ a: 1 }).to.equal({ a: 1 });
            }).to.throw();
        });
        describe('not', () => {
            it('should invert the assertion', () => {
                expect(() => {
                    expect(1).not.to.equal(1);
                }).to.throw();
            });
        });
    });

    describe('eql', () => {
        it('should not throw for deep equality', () => {
            expect({ a: 1 }).to.eql({ a: 1 });
        });
        it('should not throw with functions', () => {
            const x = () => { };
            expect(x).to.eql(x);
        });
        it('should throw when one object has a different value for the same property', () => {
            expect(() => {
                expect({ a: 1 }).to.eql({ a: 2 });
            }).to.throw(); // TODO:expect a certain message
        });
        describe('not', () => {
            it('should invert the assertion', () => {
                expect(() => {
                    expect({ a: 1 }).not.to.eql({ a: 1 });
                }).to.throw();
            });
        });
    });

    describe('rejects', () => {
        it('should not reject if promise rejects', async () => {
            await expect(Promise.reject(new Error())).to.reject();
        });
    });

    describe.skip('greaterThan', () => {
        it('should not throw when expectation is smaller than actual', () => {
            expect(1).to.be.greaterThan(0);
        });
        it('should throw when expectation is bigger than actual', () => {
            expect(() => {
                expect(1).to.be.greaterThan(2);
            }).to.throw();
        });
        describe('not', () => {
            it('should invert the assertion', () => {
                expect(() => {
                    expect(1).not.to.be.greaterThan(0);
                }).to.throw();
            });
        });
    });
});

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
            expect(1).to.eq(1);
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

    describe('greaterThan', () => {
        it('should not throw when expectation is smaller than actual', () => {
            expect(1).to.be.greaterThan(0);
        });
        it('should throw when expectation is bigger than actual', () => {
            expect(() => {
                expect(1).to.be.greaterThan(2);
            }).to.throw();
        });
        it('should work with dates', () => {
            expect(new Date(1)).to.be.gt(new Date(0));
        });
        describe('not', () => {
            it('should invert the assertion', () => {
                expect(() => {
                    expect(1).not.to.be.greaterThan(0);
                }).to.throw();
            });
        });
    });

    describe('greaterThanEqual', () => {
        it('should not throw when expectation is smaller than actual', () => {
            expect(1).to.be.greaterThanOrEqual(0);
        });
        it('should not throw when expectation is equal to actual', () => {
            expect(1).to.be.greaterThanOrEqual(1);
        });
        it('should throw when expectation is bigger than actual', () => {
            expect(() => {
                expect(1).to.be.greaterThanOrEqual(2);
            }).to.throw();
        });
        describe('not', () => {
            it('should invert the assertion', () => {
                expect(() => {
                    expect(1).not.to.be.greaterThanOrEqual(0);
                }).to.throw();
            });
        });
    });

    describe('curried', () => {
        it('should curry the assertion', () => {
            expect(() => {
                expect.to.be.greaterThan(1).evaluate(0);
            }).to.throw(/Expected 0 to be greater than 1/);
        });
    });

    describe('type', () => {
        it('should not throw for number, number', () => {
            expect(1).to.have.type('number');
        });
        it('should throw for number, string', () => {
            expect(() => {
                expect(1).to.have.type('string');
            }).to.throw(/Expected number to be a\(n\) string/);
        });
        describe('not', () => {
            it('should throw if is of type', () => {
                expect(() => {
                    expect(1).not.to.have.type('number');
                }).to.throw(/Expected number to not be a\(n\) number/);
            });
            it('should not throw if not of type', () => {
                expect(1).not.to.have.type('string');
            });
        });
    });

    describe('instanceOf', () => {
        it('should not throw if is correct constructor', () => {
            expect(new Error()).to.be.instanceOf(Error);
        });
        it('should throw if is not correct constructor', () => {
            expect(() => {
                expect(new Error()).to.be.instanceOf(Array);
            }).to.throw(/Expected Error to be an instance of Array/);
        });
        describe('not', () => {
            it('should throw if is correct constructor', () => {
                expect(() => {
                    expect(new Error()).not.to.be.instanceOf(Error);
                }).to.throw(/Expected Error to not be an instance of Error/);
            });
            it('should not throw if is not correct constructor', () => {
                expect(new Error()).not.to.be.instanceOf(Array);
            });
        });
    });

    describe('empty', () => {
        it('should not throw if array is empty', () => {
            expect([]).to.be.empty();
        });
        it('should throw if array is not empty', () => {
            expect(() => {
                expect([1]).to.be.empty();
            }).to.throw(/Expected array to be empty/);
        });
        describe('not', () => {
            it('should throw if array is empty', () => {
                expect(() => {
                    expect([]).not.to.be.empty();
                }).to.throw(/Expected array to not be empty/);
            });
            it('should not throw if array is not empty', () => {
                expect([1]).not.to.be.empty();
            });
        });
    });

    describe('size', () => {
        it('should not throw if array is of correct size', () => {
            expect([1, 2, 3]).to.have.size(3);
        });
        it('should throw if array is not of correct size', () => {
            expect(() => {
                expect([1, 2, 3]).to.have.size(2);
            }).to.throw(/Expected array to have length of 2/);
        });
        describe('not', () => {
            it('should throw if array is of correct size', () => {
                expect(() => {
                    expect([1, 2, 3]).not.to.have.length(3);
                }).to.throw(/Expected array to not have length of 3/);
            });
            it('should not throw if array is not of correct size', () => {
                expect([1, 2, 3]).not.to.have.size(2);
            });
        });
    });
});

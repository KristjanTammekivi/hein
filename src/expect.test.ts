import { expect } from './expect';

describe('expect', () => {



    describe('curried', () => {
        it('should curry the assertion', () => {
            expect(() => {
                expect.to.be.greaterThan(1).evaluate(0);
            }).to.throw(/Expected 0 to be greater than 1/);
        });
        it('should curry .length', () => {
            expect(() => {
                expect.length.to.above(1).evaluate(0);
            }).to.throw(/Expected 0 to be greater than 1/);
        });
        it.skip('should work with eql', () => {
            expect({
                a: 'test',
                b: new Date(),
            }).to.eql({
                a: 'test',
                b: expect.to.be.instanceOf(Date)
            });
        });
    });









    describe('size', () => {
        it('should not throw if length is above', () => {
            expect([1, 2]).length.to.be.above(1);
        });
    });
});

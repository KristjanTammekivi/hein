import { expect } from './expect';

describe('expect', () => {
    describe('size', () => {
        it('should not throw if length is above', () => {
            expect([1, 2]).length.to.be.above(1);
        });
    });

    it('should work with of', () => {
        expect([1, 2]).to.be.of.type('array');
    });

    describe('and', () => {
        it('should clear state', () => {
            expect(true).to.not.be.false().and.be.a.boolean();
            expect(() => {
                expect<any>(5).to.be.not.be.above(10).and.be.a.string();
            }).to.throw(/Expected number to be a\(n\) string/);
        });
    });

    describe('every', () => {
        it('should run assertion for every item in the array', () => {
            expect([1, 2, 3]).every.to.be.a.number();
        });

        it('should throw if one of the items does not match expectation', () => {
            expect(() => {
                expect<any[]>([1, 2, 'a']).every.to.be.a.number();
            }).to.throw(/Expected string to be a\(n\) number/);
        });

        it('should work with multiple expects on a single chain', () => {
            expect([1, 2, 3]).every.to.be.a.number().and.be.greaterThan(0);
        });

        it('should throw on second expect when chaining and it does not match expectation', () => {
            expect(() => {
                expect([1, 2, 3]).every.to.be.a.number().and.be.greaterThan(1);
            }).to.throw(/Expected 1 to be greater than 1/);
        });
    });
});

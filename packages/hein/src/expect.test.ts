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
});

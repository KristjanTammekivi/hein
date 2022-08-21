import { expect } from '../expect';

describe('expect/equal', () => {
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
    it('should use deep equality if chained after .deep', () => {
        expect({ a: 1 }).deep.equal({ a: 1 });
    });
    describe('not', () => {
        it('should invert the assertion', () => {
            expect(() => {
                expect(1).not.to.equal(1);
            }).to.throw();
        });
    });
});

import { expect } from '../expect';

describe('expect/less-than-equal', () => {
    it('should not throw if actual is smaller than expected', () => {
        expect(1).lessThanOrEqual(2);
    });
    it('should not throw if actual is equal to expected', () => {
        expect(1).lessThanOrEqual(1);
    });
    it('should throw if actual is greater than expected', () => {
        expect(() => expect(2).lessThanOrEqual(1)).to.throw(/Expected 2 to be less than or equal to 1/);
    });
    describe('not', () => {
        it('should not throw if actual is greater than expected', () => {
            expect(2).to.not.be.lte(1);
        });
        it('should throw if actual is equal to expected', () => {
            expect(() => expect(1).not.lessThanOrEqual(1)).to.throw(/Expected 1 to not be less than or equal to 1/);
        });
        it('should throw if actual is smaller than expected', () => {
            expect(() => expect(1).not.lessThanOrEqual(2)).to.throw(/Expected 1 to not be less than or equal to 2/);
        });
    });
});

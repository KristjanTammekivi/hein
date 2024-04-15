import { expect } from '../expect';

describe('expect/lessThan', () => {
    it('should not throw if actual is smaller than expected', () => {
        expect(1).lessThan(2);
    });

    it('should throw if actual is equal to expected', () => {
        expect(() => expect(1).lt(1)).to.throw(/Expected 1 to be less than 1/);
    });

    it('should not throw if actual is a date lesser than expected', () => {
        expect(new Date(0)).to.be.lessThan(new Date(1));
    });

    describe('not', () => {
        it('should not throw if actual is greater than expected', () => {
            expect(2).to.not.be.below(1);
        });

        it('should not throw if actual is equal to expected', () => {
            expect(1).to.not.be.below(1);
        });

        it('should throw if actual is smaller than expected', () => {
            expect(() => expect(1).not.lt(2)).to.throw(/Expected 1 to not be less than 2/);
        });
    });
});

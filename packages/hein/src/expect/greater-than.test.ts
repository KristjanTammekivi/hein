import { expect } from '../expect';

describe('expect/greaterThan', () => {
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

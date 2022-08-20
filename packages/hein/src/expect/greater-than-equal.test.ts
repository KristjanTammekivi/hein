import { expect } from '../expect';

describe('expect/greaterThanEqual', () => {
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

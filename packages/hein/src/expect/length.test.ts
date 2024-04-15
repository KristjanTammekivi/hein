import { expect } from '../expect';

describe('sizeOf', () => {
    it('should not throw if array is of correct size', () => {
        expect([1, 2, 3]).to.have.sizeOf(3);
    });

    it('should throw if array is not of correct size', () => {
        expect(() => {
            expect([1, 2, 3]).to.have.sizeOf(2);
        }).to.throw(/Expected array to have length of 2/);
    });

    describe('not', () => {
        it('should throw if array is of correct size', () => {
            expect(() => {
                expect([1, 2, 3]).not.to.have.lengthOf(3);
            }).to.throw(/Expected array to not have length of 3/);
        });

        it('should not throw if array is not of correct size', () => {
            expect([1, 2, 3]).not.to.have.sizeOf(2);
        });
    });
});

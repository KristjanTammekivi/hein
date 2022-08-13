import { expect } from '../expect';

describe('expect/empty', () => {
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

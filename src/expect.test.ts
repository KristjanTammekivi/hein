import { expect } from './expect';

describe('expect', () => {
    describe('size', () => {
        it('should not throw if length is above', () => {
            expect([1, 2]).length.to.be.above(1);
        });
    });
});

import { expect } from '../expect';

describe('expect/ballpark', () => {
    it('should not throw if value is close to ballpark', () => {
        expect(9).to.be.in.ballpark(10);
    });
    it('should throw if value is a lot higher than ballpark', () => {
        expect(() => expect(100).to.be.in.ballpark(10)).to.throw(/Expected .* to be in ballpark of .*/);
    });
    it('should allow percentage', () => {
        expect(100).to.be.in.ballpark(90, 0.2);
    });
    describe('not', () => {
        it('should not throw if value is nowhere close', () => {
            expect(1).to.not.be.in.ballpark(10);
        });
        it('should throw if value is close to ballpark', () => {
            expect(() => expect(9).to.not.be.in.ballpark(10)).to.throw(/Expected .* to not be in ballpark of .*/);
        });
    });
});

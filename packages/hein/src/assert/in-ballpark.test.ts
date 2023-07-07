import { inBallpark, notInBallpark, throws } from '../assert';

describe('assert/inBallpark', () => {
    it('should not throw if value is equal to ballpark', () => {
        inBallpark(10, 10);
    });
    it('should throw if value is a lot higher than ballpark', () => {
        throws(() => inBallpark(10, 1), /Expected .* to be in ballpark of .*/);
    });
    it('should not throw if value is a little higher than ballpark', () => {
        inBallpark(9, 10);
    });
    it('should throw if value is below the default 10% limit', () => {
        throws(() => inBallpark(8.99, 10), /Expected .* to be in ballpark of .*/);
    });
    it('should accept a custom limit', () => {
        inBallpark(8, 10, 0.2);
        throws(() => inBallpark(7.99, 10, 0.2), /Expected .* to be in ballpark of .*/);
    });
    it('should throw if multiplier is gte than 1', () => {
        throws(() => inBallpark(10, 10, 1), /Expected multiplier to be between 0 and 1/);
    });
    describe('notInBallpark', () => {
        it('should not throw if value is nowhere close', () => {
            notInBallpark(1, 10);
        });
        it('should throw if value is equal to ballpark', () => {
            throws(() => notInBallpark(10, 10), /Expected .* to not be in ballpark of .*/);
        });
        it('should throw if multiplier is lte than 0', () => {
            throws(() => notInBallpark(10, 10, 0), /Expected multiplier to be between 0 and 1/);
        });
    });
});

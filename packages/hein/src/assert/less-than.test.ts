import { lessThan, notLessThan, throws } from '../assert';

describe('assert/lesserThan', () => {
    it('should not throw if actual is lesser than expected', () => {
        lessThan(0, 1);
    });

    it('should throw if actual is greater than expected', () => {
        throws(() => {
            lessThan(2, 1);
        });
    });

    describe('assert/notLesserThan', () => {
        it('should not throw if actual is greater than expected', () => {
            notLessThan(2, 1);
        });

        it('should not throw if actual is equal to expected', () => {
            notLessThan(1, 1);
        });

        it('should throw if actual is lesser than expected', () => {
            throws(() => {
                notLessThan(0, 1);
            });
        });
    });
});

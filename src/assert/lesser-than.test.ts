import { throws } from '../assert';
import { lesserThan, notLesserThan } from './lesser-than';

describe('lesserThan', () => {
    it('should not throw if actual is lesser than expected', () => {
        lesserThan(0, 1);
    });
    it('should throw if actual is greater than expected', () => {
        throws(() => {
            lesserThan(2, 1);
        });
    });
    describe('notLesserThan', () => {
        it('should not throw if actual is greater than expected', () => {
            notLesserThan(2, 1);
        });
        it('should not throw if actual is equal to expected', () => {
            notLesserThan(1, 1);
        });
        it('should throw if actual is lesser than expected', () => {
            throws(() => {
                notLesserThan(0, 1);
            });
        });
    });
});

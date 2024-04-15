import { isBefore, notBefore, throws } from '../assert';

describe('assert/is-before', () => {
    let earlierDate: Date;
    let laterDate: Date;

    beforeEach(() => {
        earlierDate = new Date(2019, 1, 1);
        laterDate = new Date(2020, 1, 1);
    });

    it('should not throw if date is before expected', () => {
        isBefore(earlierDate, laterDate);
    });

    it('should throw if date is after expected', () => {
        throws(() => isBefore(laterDate, earlierDate), /Expected .* to be before .*/);
    });

    it('should throw if date is equal to expected', () => {
        throws(() => isBefore(laterDate, new Date(laterDate)), /Expected .* to be before .*/);
    });

    describe('assert/notBefore', () => {
        it('should not throw if date is after expected', () => {
            notBefore(laterDate, earlierDate);
        });

        it('should throw if date is before expected', () => {
            throws(() => notBefore(earlierDate, laterDate), /Expected .* to not be before .*/);
        });

        it('should not throw if date is equal to expected', () => {
            notBefore(laterDate, new Date(laterDate));
        });
    });
});

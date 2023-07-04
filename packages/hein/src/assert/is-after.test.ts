import { isAfter, notAfter, throws } from '../assert';

describe('assert/is-after', () => {
    let earlierDate: Date;
    let laterDate: Date;
    beforeEach(() => {
        earlierDate = new Date(2019, 1, 1);
        laterDate = new Date(2020, 1, 1);
    });
    it('should not throw if date is after expected', () => {
        isAfter(laterDate, earlierDate);
    });
    it('should throw if date is before expected', () => {
        throws(() => isAfter(earlierDate, laterDate), /Expected .* to be after .*/);
    });
    it('should throw if date is equal to expected', () => {
        throws(() => isAfter(laterDate, new Date(laterDate)), /Expected .* to be after .*/);
    });
    describe('assert/notAfter', () => {
        it('should not throw if date is before expected', () => {
            notAfter(earlierDate, laterDate);
        });
        it('should throw if date is after expected', () => {
            throws(() => notAfter(laterDate, earlierDate), /Expected .* to not be after .*/);
        });
        it('should not throw if date is equal to expected', () => {
            notAfter(laterDate, new Date(laterDate));
        });
    });
});

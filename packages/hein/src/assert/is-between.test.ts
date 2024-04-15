import { isBetween, notBetween, throws } from '../assert';

describe('assert/is-between', () => {
    let earlierDate: Date;
    let laterDate: Date;
    let evenLaterDate: Date;

    beforeEach(() => {
        earlierDate = new Date(2019, 1, 1);
        laterDate = new Date(2020, 1, 1);
        evenLaterDate = new Date(2021, 1, 1);
    });

    it('should not throw if date is after expected', () => {
        isBetween(laterDate, earlierDate, evenLaterDate);
    });

    it('should throw if date is before expected', () => {
        throws(() => isBetween(earlierDate, laterDate, evenLaterDate), /Expected .* to be between .* and .*/);
    });

    it('should throw if date is after expected', () => {
        throws(() => isBetween(evenLaterDate, earlierDate, laterDate), /Expected .* to be between .* and .*/);
    });

    it('should not throw if date is equal to lower bound', () => {
        isBetween(laterDate, new Date(laterDate), evenLaterDate);
    });

    it('should work exclusively when specified', () => {
        throws(() => isBetween(laterDate, new Date(laterDate), evenLaterDate, { inclusive: false }));
    });

    it('should work with numbers', () => {
        isBetween(2, 1, 3);
        throws(() => isBetween(1, 2, 3), /Expected .* to be between .* and .*/);
    });

    it('should work when lower bound is greater than upper bound', () => {
        isBetween(2, 3, 1);
    });

    describe('assert/notBetween', () => {
        it('should not throw if date is before expected', () => {
            notBetween(earlierDate, laterDate, evenLaterDate);
        });

        it('should throw if date is between expected', () => {
            throws(() => notBetween(laterDate, earlierDate, evenLaterDate), /Expected .* to not be between .* and .*/);
        });

        it('should throw if date is equal to lower bound', () => {
            throws(
                () => notBetween(laterDate, new Date(laterDate), evenLaterDate),
                /Expected .* to not be between .* and .*/
            );
        });
    });
});

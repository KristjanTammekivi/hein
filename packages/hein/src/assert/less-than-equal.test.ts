import { lessThanEqual, notLessThanEqual } from '../assert';
import { throws } from '../assert';

describe('assert/lessThanEqual', () => {
    it('should not throw if less than expected', () => {
        lessThanEqual(0, 1);
    });

    it('should not throw if equal to expected', () => {
        lessThanEqual(1, 1);
    });

    it('should throw if greater than expected', () => {
        throws(() => {
            lessThanEqual(2, 1);
        }, /Expected 2 to be less than or equal to 1/);
    });

    it('should work with Dates', () => {
        lessThanEqual(new Date(0), new Date(1));
    });

    it('should throw with wrong arguments', () => {
        throws(() => {
            // @ts-expect-error wrong type on purpose
            lessThanEqual('test', new Date());
        }, /Expected arguments to be number\/bigint\/date, received string\/date/);
        throws(() => {
            // @ts-expect-error wrong type on purpose
            lessThanEqual(new Date(), []);
        }, /Expected arguments to be number\/bigint\/date, received date\/array/);
    });

    it('should throw with NaN arguments', () => {
        throws(() => {
            lessThanEqual(Number.NaN, 1);
        }, /Expected arguments to be number\/bigint\/date, received NaN\/number/);
    });

    describe('assert/notLessThanEqual', () => {
        it('should not throw if greater than expected', () => {
            notLessThanEqual(2, 1);
        });

        it('should throw if less than expected', () => {
            throws(() => {
                notLessThanEqual(0, 1);
            }, /Expected 0 to not be less than or equal to 1/);
        });

        it('should throw if equal to expected', () => {
            throws(() => {
                notLessThanEqual(1, 1);
            }, /Expected 1 to not be less than or equal to 1/);
        });
    });
});

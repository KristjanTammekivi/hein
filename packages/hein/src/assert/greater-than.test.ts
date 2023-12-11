import { greaterThan, notGreaterThan } from '../assert';
import { throws } from '../assert';

describe('assert/greaterThan', () => {
    it('should not throw if actual is greater than expected', () => {
        greaterThan(1, 0);
    });
    it('should throw if actual and expected are equal', () => {
        throws(() => greaterThan(1, 1), /Expected 1 to be greater than 1/);
    });
    it('should throw if actual is not a number', async () => {
        // @ts-expect-error intentionally wrong type
        throws(() => greaterThan('a', 1), /Expected arguments to be number\/bigint\/date, received string\/number/);
    });
    it('should throw if actual is smaller than expected', async () => {
        throws(() => greaterThan(0, 1), /Expected 0 to be greater than 1/);
    });
    it('should throw if dates are equal', async () => {
        throws(() => greaterThan(new Date(0), new Date(0)));
    });
    describe('assert/notGreaterThan', () => {
        it('should not throw if greater is smaller than expected', () => {
            notGreaterThan(0, 1);
        });
        it('should not throw if actual is equal to expected', () => {
            notGreaterThan(1, 1);
        });
        it('should throw if actual is greater than expected', () => {
            throws(() => notGreaterThan(2, 1), /Expected 2 to not be greater than 1/);
        });
    });
});

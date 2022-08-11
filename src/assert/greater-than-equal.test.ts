import { throws } from 'assert';
import { greaterThanEqual } from '../assert';

describe('greaterThanEqual', () => {
    it('should not throw if actual is greater than expected', () => {
        greaterThanEqual(1, 0);
    });
    it('should not throw if values are equal', () => {
        greaterThanEqual(1, 1);
    });
    it('should throw if actual is smaller than expected', () => {
        throws(() => {
            greaterThanEqual(0, 1);
        });
    });
});

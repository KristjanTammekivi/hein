import { notIncludes, throws } from '../assert';
import { includes } from '../assert';

describe('assert/includes', () => {
    describe('arrays', () => {
        it('should not throw if array includes value', () => {
            includes([1, 2], 2);
        });
        it('should throw if value is missing from array', () => {
            throws(() => {
                includes([1, 2], 3);
            }, /Expected \[ 1, 2 ] to include 3/);
        });
        it('should not throw if elements exist but are out of order', () => {
            includes([1, 2], 2, 1);
        });
        describe('assert/notIncludes', () => {
            it('should throw if value is present in array', () => {
                throws(() => {
                    notIncludes([1, 2], 1);
                }, /Expected \[ 1, 2 ] to not include 1/);
            });
            it('should not throw if element does not exist in the array', () => {
                notIncludes([1, 2], 3);
            });
            it('should throw if first value is not in array but second one is', () => {
                throws(() => {
                    notIncludes([1, 2], 3, 1);
                }, /Expected \[ 1, 2 ] to not include 1/);
            });
        });
    });
    describe('strings', () => {
        it('should not throw if string includes value', () => {
            includes('abc', 'b');
        });
        it('should throw if string does not include value', () => {
            throws(() => {
                includes('abc', 'd');
            }, /Expected 'abc' to include 'd'/);
        });
    });
});

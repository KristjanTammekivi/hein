import { isEmpty, notIsEmpty } from '../assert';
import { throws } from '../assert';

describe('assert/isEmpty', () => {
    describe('assert/array', () => {
        it('should not throw if array is empty', () => {
            isEmpty([]);
        });
        it('should throw if array is not empty', () => {
            throws(() => isEmpty([1]), /Expected array to be empty/);
        });
        describe('assert/notIsEmpty', () => {
            it('should throw if array is empty', () => {
                throws(() => {
                    notIsEmpty([]);
                }, /Expected array to not be empty/);
            });
            it('should not throw if array is not empty', () => {
                notIsEmpty([1]);
            });
        });
    });
    describe('assert/object', () => {
        it('should not throw if object is empty', () => {
            isEmpty({});
        });
        it('should throw if object is not empty', () => {
            throws(() => isEmpty({ a: 1 }), /Expected object to be empty/);
        });
        describe('assert/notIsEmpty', () => {
            it('should throw if object is empty', () => {
                throws(() => {
                    notIsEmpty({});
                }, /Expected object to not be empty/);
            });
            it('should not throw if object is not empty', () => {
                notIsEmpty({ a: 1 });
            });
        });
    });
    describe('assert/Map', () => {
        it('should not throw if map is empty', () => {
            isEmpty(new Map());
        });
        it('should throw if map is not empty', () => {
            throws(() => isEmpty(new Map([['a', 1]])), /Expected Map to be empty/);
        });
        describe('assert/notIsEmpty', () => {
            it('should throw if map is empty', () => {
                throws(() => {
                    notIsEmpty(new Map());
                }, /Expected Map to not be empty/);
            });
            it('should not throw if map is not empty', () => {
                notIsEmpty(new Map([['a', 1]]));
            });
        });
    });
    describe('assert/Set', () => {
        it('should not throw if Set is empty', () => {
            isEmpty(new Set());
        });
        it('should throw if Set is not empty', () => {
            throws(() => isEmpty(new Set([1])), /Expected Set to be empty/);
        });
        describe('assert/notIsEmpty', () => {
            it('should throw if Set is empty', () => {
                throws(() => {
                    notIsEmpty(new Set());
                }, /Expected Set to not be empty/);
            });
        });
    });
    it('should throw if value is not an array, object, Map, or Set', () => {
        throws(() => isEmpty(1 as any), /Expected 1 to be an array, object, Map, or Set/);
        throws(() => notIsEmpty(1 as any), /Expected 1 to be an array, object, Map, or Set/);
    });
});

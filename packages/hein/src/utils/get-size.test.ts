import { expect } from '../expect';
import { getSize } from './get-size';

describe('getSize', () => {
    it('should get the size of an array', () => {
        expect(getSize([1, 2, 3])).to.equal(3);
    });
    it('should get the key-count of an object', () => {
        expect(getSize({ a: 1, b: 2 })).to.equal(2);
    });
    it('should get the size of a Set', () => {
        expect(getSize(new Set([1, 2, 3]))).to.equal(3);
    });
    it('should get the key count of a Map', () => {
        expect(getSize(new Map([['a', 1], ['b', 2]]))).to.equal(2);
    });
    it('should get the length of a string', () => {
        expect(getSize('abc')).to.equal(3);
    });
    it('should return 0 for a non-valid value', () => {
        expect(getSize(null)).to.equal(0);
    });
});

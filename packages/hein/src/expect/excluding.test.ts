import { expect } from '../expect';

describe('expect/excluding', () => {
    it('should exclude a propery', () => {
        expect({ a: 1, b: 2 }).excluding('a').to.eql({ b: 2 });
    });

    it('should chain further', () => {
        expect({ a: 1, b: 2, c: 3 }).excluding('a').excluding('b').to.eql({ c: 3 });
    });
});

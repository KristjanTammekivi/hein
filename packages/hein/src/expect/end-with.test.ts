import { expect } from '../expect';

describe('expect/endWith', () => {
    it('should not throw if string ends with value', () => {
        expect('abc').to.endWith('bc');
    });
    it('should throw if string does not end with substring', () => {
        expect(() => expect('abc').to.endWith('ba')).to.throw(/Expected 'abc' to end with 'ba'/);
    });
    it('should throw when inversed and string ends with substring', () => {
        expect(() => expect('abc').to.not.endWith('bc')).to.throw(/Expected 'abc' to not end with 'bc'/);
    });
});

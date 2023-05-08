import { expect } from '../expect';

describe('expect/startWith', () => {
    it('should not throw if string starts with value', () => {
        expect('abc').to.startWith('ab');
    });
    it('should throw if string does not start with substring', () => {
        expect(() => expect('abc').to.startWith('ba')).to.throw(/Expected 'abc' to start with 'ba'/);
    });
    it('should throw when inversed and string starts with substring', () => {
        expect(() => expect('abc').to.not.startWith('ab')).to.throw(/Expected 'abc' to not start with 'ab'/);
    });
});

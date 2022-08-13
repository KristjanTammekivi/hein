import { expect } from '../expect';

describe('expect/eql', () => {
    it('should not throw for deep equality', () => {
        expect({ a: 1 }).to.eql({ a: 1 });
    });
    it('should not throw with functions', () => {
        const x = () => { };
        expect(x).to.eql(x);
    });
    it('should throw when one object has a different value for the same property', () => {
        expect(() => {
            expect({ a: 1 }).to.eql({ a: 2 });
        }).to.throw(); // TODO:expect a certain message
    });
    describe('not', () => {
        it('should invert the assertion', () => {
            expect(() => {
                expect({ a: 1 }).not.to.eql({ a: 1 });
            }).to.throw();
        });
    });
});

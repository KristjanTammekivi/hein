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
        }).to.throw();
    });
    it('should accept message argument', () => {
        expect(() => {
            expect({ a: 1 }).to.eql({ a: 2 }, 'my message');
        }).to.throw(/my message/);
    });
    it('should do a partial deep equality with .partially', () => {
        expect({ a: 1, b: { c: 2, d: 3 } }).to.partially.eql({ b: { c: 2 } });
    });
    it('should work with arrays and partiality', () => {
        expect({ a: [1] }).to.partially.eql({ a: [] });
    });
    describe('not', () => {
        it('should invert the assertion', () => {
            expect(() => {
                expect({ a: 1 }).not.to.eql({ a: 1 });
            }).to.throw();
        });
        it('should work with arrays and partiality', () => {
            expect({ a: [] }).to.not.partially.eql({ a: [1] });
        });
    });
});

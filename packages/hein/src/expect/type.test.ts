import { expect } from '../expect';

describe('expect/type', () => {
    it('should not throw for number, number', () => {
        expect(1).to.have.type('number');
    });
    it('should throw for number, string', () => {
        expect(() => {
            expect(1).to.have.type('string');
        }).to.throw(/Expected number to be a\(n\) string/);
    });
    describe('not', () => {
        it('should throw if is of type', () => {
            expect(() => {
                expect(1).not.to.have.type('number');
            }).to.throw(/Expected number to not be a\(n\) number/);
        });
        it('should not throw if not of type', () => {
            expect(1).not.to.have.type('string');
        });
    });
});

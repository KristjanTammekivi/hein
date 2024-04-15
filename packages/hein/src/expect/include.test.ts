import { expect } from '../expect';

describe('expect/include', () => {
    describe('arrays', () => {
        it('should not throw if element is in array', () => {
            expect([1, 2]).to.include(1);
        });

        it('should throw if element is not in array', () => {
            expect(() => expect([1, 2]).to.include(3)).to.throw(/Expected \[ 1, 2 ] to include 3/);
        });

        describe('not', () => {
            it('should throw if element is in array', () => {
                expect(() => expect([1, 2]).not.to.include(1)).to.throw(/Expected \[ 1, 2 ] to not include 1/);
            });

            it('should not throw if element is not in array', () => {
                expect([1, 2]).not.to.include(3);
            });
        });
    });

    describe('strings', () => {
        it('should not throw if string includes value', () => {
            expect('abc').to.include('bc');
        });

        it('should throw if string does not include substring', () => {
            expect(() => expect('abc').to.include('ba')).to.throw(/Expected 'abc' to include 'ba'/);
        });

        it('should not throw when using .contain', () => {
            expect('abc').to.contain('bc');
        });
    });
});

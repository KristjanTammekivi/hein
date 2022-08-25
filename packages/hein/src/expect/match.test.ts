import { expect } from '../expect';

describe('expect/match', () => {
    it('should not throw if regex matches actual', () => {
        expect('abc').match(/abc/);
    });
    it('should throw if regex does not match actual', () => {
        expect(() => {
            expect('abc').match(/def/);
        }).to.throw(/Expected abc to match \/def\//);
    });
    describe('not', () => {
        it('should not throw if regex does not match actual', () => {
            expect('abc').not.match(/def/);
        });
        it('should throw if regex matches actual', () => {
            expect(() => {
                expect('abc').not.match(/abc/);
            }).to.throw(/Expected abc to not match \/abc\//);
        });
    });
});

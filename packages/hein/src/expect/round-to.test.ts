import { expect } from '../expect';

describe('expect/roundTo', () => {
    it('should not throw if value rounds target integer', () => {
        expect(1.0002).to.roundTo(1);
    });

    it('should throw if value does not round to target', () => {
        expect(() => expect(1.15).to.roundTo(1.1, 1)).to.throw(/Expected 1\.15 to round to 1\.1*/);
    });

    describe('not', () => {
        it('should not throw if value does not round to target', () => {
            expect(1.15).to.not.roundTo(1.1, 1);
        });

        it('should throw if value rounds target integer', () => {
            expect(() => expect(1.0002).to.not.roundTo(1, 1)).to.throw(/Expected 1\.0002 to not round to 1/);
        });
    });
});

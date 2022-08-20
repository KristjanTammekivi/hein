import { expect } from '../expect';

describe('expect/instanceOf', () => {
    it('should not throw if is correct constructor', () => {
        expect(new Error()).to.be.instanceOf(Error);
    });
    it('should throw if is not correct constructor', () => {
        expect(() => {
            expect(new Error()).to.be.instanceOf(Array);
        }).to.throw(/Expected Error to be an instance of Array/);
    });
    describe('not', () => {
        it('should throw if is correct constructor', () => {
            expect(() => {
                expect(new Error()).not.to.be.instanceOf(Error);
            }).to.throw(/Expected Error to not be an instance of Error/);
        });
        it('should not throw if is not correct constructor', () => {
            expect(new Error()).not.to.be.instanceOf(Array);
        });
    });
});

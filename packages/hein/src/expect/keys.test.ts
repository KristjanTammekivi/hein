import { expect } from '../expect';

describe('expect/keys', () => {
    it('should not throw if object has keys', () => {
        expect({ a: 1 }).to.have.keys('a');
    });
    it('should throw if object has keys', () => {
        expect(() => expect({ a: 1 }).to.have.keys('b' as any)).to.throw(/Expected '{ a: 1 }' to have keys \[ 'b' ]/);
    });
    describe('not', () => {
        it('should not throw if object does not have keys', () => {
            expect({ a: 1 }).to.not.have.keys('b' as any);
        });
        it('should throw if object has keys', () => {
            expect(() => expect({ a: 1 }).to.not.have.keys('a')).to.throw(
                /Expected '{ a: 1 }' to not have keys \[ 'a' ]/
            );
        });
    });
});

import { expect } from '../expect';

describe('expect/members', () => {
    it('should not throw if arrays have same members', () => {
        expect([1]).to.have.members([1]);
    });

    it('should throw if arrays do not have same members', () => {
        expect(() => expect([1]).to.have.members([2])).to.throw(/Expected \[ 1 ] to have members \[ 2 ]/);
    });

    it('should throw if deep flag is not enabled and members are objects', () => {
        expect(() => expect([{ a: 1 }]).to.have.members([{ a: 1 }])).to.throw(
            /Expected \[ { a: 1 } ] to have members \[ { a: 1 } ]/
        );
    });

    describe('same', () => {
        it('should not throw if same flag is enabled and both arrays have same members', () => {
            expect([1]).to.have.same.members([1]);
        });

        it('should throw if first array has more members than second array', () => {
            expect(() => expect([1, 2]).to.have.same.members([1])).to.throw(
                /Expected \[ 1, 2 ] to have same members as \[ 1 ]/
            );
        });
    });

    describe('ordered', () => {
        it('should not throw if ordered flag is enabled and both arrays have same members in same order', () => {
            expect([1, 2]).to.have.ordered.members([1, 2]);
        });

        it('should throw if ordered flag is enabled and both arrays have same members in different order', () => {
            expect(() => expect([1, 2]).to.have.ordered.members([2, 1])).to.throw(
                /Expected \[ 1, 2 ] to have ordered members \[ 2, 1 ]/
            );
        });
    });

    describe('deep', () => {
        it('should not throw if deep flag is enabled and members are objects', () => {
            expect([{ a: 1 }]).to.have.deep.members([{ a: 1 }]);
        });

        it('should throw if deep flag is enabled and members are objects but do not match', () => {
            expect(() => expect([{ a: 1 }]).to.have.deep.members([{ a: 2 }])).to.throw(
                /Expected \[ { a: 1 } ] to have members \[ { a: 2 } ]/
            );
        });
    });

    describe('partial', () => {
        it('should not throw if partial flag is enabled and members are objects', () => {
            expect([{ a: 1, b: 2 }]).to.have.partially.members([{ a: 1 }]);
        });

        it('should throw if partial flag is enabled and members are objects but do not match', () => {
            expect(() => expect([{ a: 1, b: 2 }]).to.have.partially.members([{ a: 2 }])).to.throw(
                /Expected \[ { a: 1, b: 2 } ] to have members \[ { a: 2 } ]/
            );
        });
    });

    describe('not', () => {
        it('should not throw if arrays do not have same members', () => {
            expect([1]).to.not.have.members([2]);
        });
    });

    it('should throw if non-array is passed', () => {
        // @ts-expect-error testing if non-array is caught
        expect(() => expect([1]).to.have.members(1)).to.throw();
    });

    it('should not produce a typescript error if passed any with partially', () => {
        expect([{ a: 1 }] as any).to.partially.have.members([{ a: 1 }]);
    });
});

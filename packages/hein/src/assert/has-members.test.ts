import { hasMembers, notHasMembers, throws } from '../assert';

describe('assert/hasMembers', () => {
    it('should not throw if array has members', () => {
        hasMembers([1], [1]);
    });
    it('should throw if array does not have members', () => {
        throws(() => hasMembers([1], [2]), /Expected \[ 1 ] to have members \[ 2 ]/);
    });
    it('should not throw if members are out of order', () => {
        hasMembers([1, 2], [2, 1]);
    });
    it('should throw if array does not have members when actual array has more items', () => {
        throws(() => hasMembers([1, 2], [3]), /Expected \[ 1, 2 ] to have members \[ 3 ]/);
    });
    it('should throw if members are objects', () => {
        throws(() => hasMembers([{ a: 1 }], [{ a: 1 }]), /Expected \[ { a: 1 } ] to have members \[ { a: 1 } ]/);
    });
    describe('same', () => {
        it('should not throw if same flag is enabled and both arrays have same members', () => {
            hasMembers([1], [1], { same: true });
        });
        it('should throw if first array has more members than second array', () => {
            throws(() => hasMembers([1, 2], [1], { same: true }), /Expected \[ 1, 2 ] to have same members as \[ 1 ]/);
        });
    });
    describe('ordered', () => {
        it('should not throw if ordered flag is enabled and both arrays have same members in same order', () => {
            hasMembers([1, 2], [1, 2], { ordered: true });
        });
        it('should throw if ordered flag is enabled and both arrays have same members in different order', () => {
            throws(
                () => hasMembers([1, 2], [2, 1], { ordered: true }),
                /Expected \[ 1, 2 ] to have ordered members \[ 2, 1 ]/
            );
        });
        describe('deep', () => {
            it('should not throw if deep and ordered flags are enabled and members are objects in the same order', () => {
                hasMembers([{ a: 1 }, { b: 2 }], [{ a: 1 }, { b: 2 }], { deep: true, ordered: true });
            });
            it('should throw if deep and ordered flags are enabled and members are objects in different order', () => {
                throws(
                    () => hasMembers([{ a: 1 }, { b: 2 }], [{ b: 2 }, { a: 1 }], { deep: true, ordered: true }),
                    /Expected \[ { a: 1 }, { b: 2 } ] to have ordered members \[ { b: 2 }, { a: 1 } ]/
                );
            });
        });
    });
    describe('deep', () => {
        it('should not throw if deep flag is enabled and members are objects', () => {
            hasMembers([{ a: 1 }], [{ a: 1 }], { deep: true });
        });
        it('should throw if deep flag is enabled and members are objects but do not match', () => {
            throws(
                () => hasMembers([{ a: 1 }], [{ a: 2 }], { deep: true }),
                /Expected \[ { a: 1 } ] to have members \[ { a: 2 } ]/
            );
        });
    });
    describe('partial', () => {
        it('should not throw if partial flag is enabled and members are objects', () => {
            hasMembers([{ a: 1 }], [{ a: 1 }], { partial: true });
        });
        it('should not throw if partial flag is enabled and members are objects and partially match', () => {
            hasMembers([{ a: 1, b: 2 }], [{ a: 1 }], { partial: true });
        });
    });
    describe('assert/notHasMembers', () => {
        it('should not throw if array does not have members', () => {
            notHasMembers([1], [2]);
        });
        it('should throw if array has members', () => {
            throws(() => notHasMembers([1], [1]), /Expected \[ 1 ] to not have members \[ 1 ]/);
        });
        describe('same', () => {
            it('should not throw if same flag is enabled and second array is subset of first array', () => {
                notHasMembers([1, 2], [1], { same: true });
            });
            it('should throw if same flag is enabled and arrays are equal', () => {
                throws(
                    () => notHasMembers([1, 2], [1, 2], { same: true }),
                    /Expected \[ 1, 2 ] to not have same members as \[ 1, 2 ]/
                );
            });
        });
        describe('ordered', () => {
            it('should not throw if ordered flag is enabled and arrays are in wrong order', () => {
                notHasMembers([1, 2], [2, 1], { ordered: true });
            });
            it('should throw if ordered flag is enabled and arrays are in correct order', () => {
                throws(
                    () => notHasMembers([1, 2], [1, 2], { ordered: true }),
                    /Expected \[ 1, 2 ] to not have members \[ 1, 2 ]/
                );
            });
        });
    });
});

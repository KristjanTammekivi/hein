import { throws } from '../assert';
import { hasSize, notHasSize } from '../assert';

describe('assert/hasSize', () => {
    describe('assert/array', () => {
        it('should not throw if array has correct size', () => {
            hasSize([1, 2, 3], 3);
        });

        it('should throw if array has incorrect size', () => {
            throws(() => hasSize([1, 2, 3], 2), /Expected array to have length of 2/);
        });

        it('should throw with provided message', () => {
            throws(() => hasSize([1, 2, 3], 2, 'Expected array to be almost full'), /Expected array to be almost full/);
        });

        describe('assert/notHasSize', () => {
            it('should throw if array has correct size', () => {
                throws(() => {
                    notHasSize([1, 2, 3], 3);
                }, /Expected array to not have length of 3/);
            });

            it('should not throw if array has incorrect size', () => {
                notHasSize([1, 2, 3], 2);
            });

            it('should throw with provided message', () => {
                throws(() => {
                    notHasSize([1, 2, 3], 3, 'Expected array to be almost full');
                }, /Expected array to be almost full/);
            });
        });
    });

    describe('assert/object', () => {
        it('should not throw if object has correct size', () => {
            hasSize({ a: 1, b: 2, c: 3 }, 3);
        });

        it('should throw if object has incorrect size', () => {
            throws(() => hasSize({ a: 1, b: 2, c: 3 }, 2), /Expected object to have size of 2/);
        });

        it('should throw with provided message', () => {
            throws(
                () => hasSize({ a: 1, b: 2, c: 3 }, 2, 'Expected object to be almost full'),
                /Expected object to be almost full/
            );
        });

        describe('assert/notHasSize', () => {
            it('should throw if object has correct size', () => {
                throws(() => {
                    notHasSize({ a: 1, b: 2, c: 3 }, 3);
                }, /Expected object to not have size of 3/);
            });

            it('should not throw if object has incorrect size', () => {
                notHasSize({ a: 1, b: 2, c: 3 }, 2);
            });

            it('should throw with provided message', () => {
                throws(() => {
                    notHasSize({ a: 1, b: 2, c: 3 }, 3, 'Expected object to be almost full');
                }, /Expected object to be almost full/);
            });
        });
    });

    describe('assert/Map', () => {
        it('should not throw if Map has correct size', () => {
            hasSize(
                new Map([
                    ['a', 1],
                    ['b', 2],
                    ['c', 3]
                ]),
                3
            );
        });

        it('should throw if Map has incorrect size', () => {
            throws(
                () =>
                    hasSize(
                        new Map([
                            ['a', 1],
                            ['b', 2],
                            ['c', 3]
                        ]),
                        2
                    ),
                /Expected Map to have size of 2/
            );
        });

        it('should throw with provided message', () => {
            throws(
                () =>
                    hasSize(
                        new Map([
                            ['a', 1],
                            ['b', 2],
                            ['c', 3]
                        ]),
                        2,
                        'Expected Map to be almost full'
                    ),
                /Expected Map to be almost full/
            );
        });

        describe('assert/notHasSize', () => {
            it('should throw if Map has correct size', () => {
                throws(() => {
                    notHasSize(
                        new Map([
                            ['a', 1],
                            ['b', 2],
                            ['c', 3]
                        ]),
                        3
                    );
                }, /Expected Map to not have size of 3/);
            });

            it('should not throw if Map has incorrect size', () => {
                notHasSize(
                    new Map([
                        ['a', 1],
                        ['b', 2],
                        ['c', 3]
                    ]),
                    2
                );
            });

            it('should throw with provided message', () => {
                throws(() => {
                    notHasSize(
                        new Map([
                            ['a', 1],
                            ['b', 2],
                            ['c', 3]
                        ]),
                        3,
                        'Expected Map to be almost full'
                    );
                }, /Expected Map to be almost full/);
            });
        });
    });

    describe('assert/Set', () => {
        it('should not throw if Set has correct size', () => {
            hasSize(new Set([1, 2, 3]), 3);
        });

        it('should throw if Set has incorrect size', () => {
            throws(() => hasSize(new Set([1, 2, 3]), 2), /Expected Set to have size of 2/);
        });

        it('should throw with provided message', () => {
            throws(
                () => hasSize(new Set([1, 2, 3]), 2, 'Expected Set to be almost full'),
                /Expected Set to be almost full/
            );
        });

        describe('assert/notHasSize', () => {
            it('should throw if Set has correct size', () => {
                throws(() => {
                    notHasSize(new Set([1, 2, 3]), 3);
                }, /Expected Set to not have size of 3/);
            });

            it('should not throw if Set has incorrect size', () => {
                notHasSize(new Set([1, 2, 3]), 2);
            });

            it('should throw with provided message', () => {
                throws(() => {
                    notHasSize(new Set([1, 2, 3]), 3, 'Expected Set to be almost full');
                }, /Expected Set to be almost full/);
            });
        });
    });

    describe('assert/string', () => {
        it('should not throw if string has correct size', () => {
            hasSize('abc', 3);
        });

        it('should throw if string has incorrect size', () => {
            throws(() => hasSize('abc', 2), /Expected string to have length of 2/);
        });

        it('should throw with provided message', () => {
            throws(() => hasSize('abc', 2, 'Expected string to be almost full'), /Expected string to be almost full/);
        });

        describe('assert/notHasSize', () => {
            it('should throw if string has correct size', () => {
                throws(() => {
                    notHasSize('abc', 3);
                }, /Expected string to not have length of 3/);
            });

            it('should not throw if string has incorrect size', () => {
                notHasSize('abc', 2);
            });

            it('should throw with provided message', () => {
                throws(() => {
                    notHasSize('abc', 3, 'Expected string to be almost full');
                }, /Expected string to be almost full/);
            });
        });
    });

    describe('None of the Above', () => {
        it('should throw if value is none of the above', () => {
            throws(() => hasSize(5 as any, 5), /Expected number to be an array, object, Map, Set or string/);
        });

        describe('assert/notHasSize', () => {
            it('should throw if value is none of the above', () => {
                throws(() => notHasSize(5 as any, 5), /Expected number to be an array, object, Map, Set or string/);
            });
        });
    });
});

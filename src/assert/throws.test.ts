import { notThrows, throws } from './throws';

class FailError extends Error { }

const fail = () => {
    throw new FailError('Expected function to throw');
};

describe('throws', () => {
    it(`should throw if the callback doesn't throw`, () => {
        try {
            throws(() => { });
            fail();
        } catch {
            return;
        }
    });
    it('should not throw if callback throws', () => {
        throws(() => {
            throw new Error('Things are bad');
        });
    });
    it('should throw with provided message', () => {
        try {
            throws(() => { }, 'Things are bad');
            fail();
        } catch (e) {
            if (e instanceof FailError) {
                throw e;
            }
            if (e.message !== 'Things are bad') {
                throw new Error('Expected message to be "Things are bad"');
            }
        }
    });
    it(`should not throw if error message matches the provided RegExp`, () => {
        throws(() => {
            throw new Error('Things are bad');
        }, /Things are bad/);
    });
    it(`should throw if error message doesn't match the provided RegExp`, () => {
        throws(() => {
            throws(() => {
                throw new Error('Things are bad');
            }, /Things are good/);
        }, /Expected function to throw an error matching \/Things are good\//);
    });
    it(`should throw with the provide message if error message doesn't match the provided RegExp`, () => {
        throws(() => {
            throws(() => {
                throw new Error('Things are bad');
            }, /Things are good/, 'Damn');
        }, /Damn/);
    });
    it(`should throw if error isn't an instance of the provided constructor`, () => {
        class CustomError extends Error { }
        throws(() => {
            throws(() => { throw new Error(); }, CustomError);
        }, /Expected function to throw CustomError/);
    });
    it('should not throw if error is an instance of the provided constructor', () => {
        class CustomError extends Error { }
        throws(() => { throw new CustomError(); }, CustomError);
    });
    it(`should throw with the provided message if error isn't an instance of the provided constructor`, () => {
        class CustomError extends Error { }
        throws(() => {
            throws(() => { throw new Error(); }, CustomError, 'Damn');
        }, /Damn/);
    });
    it('should throw if error predicate function returns false for the thrown error', () => {
        throws(() => {
            throws(() => { throw new Error('oops'); }, () => false);
        }, /Expected Error: oops to match predicate function/);
    });
    it('should not throw if error predicate function returns true for the thrown error', () => {
        throws(() => { throw new Error('oops'); }, () => true);
    });
    it('should throw with the provided message if error predicate function returns false for the thrown error', () => {
        throws(() => {
            throws(() => { throw new Error('oops'); }, () => false, 'Damn');
        }, /Damn/);
    });
    describe('notThrows', () => {
        const errorCallback = () => {
            throw new Error('Correct');
        };
        it(`should not throw error if callback doesn't throw`, () => {
            notThrows(() => { });
        });
        it('should throw error if callback throws', () => {
            throws(() => notThrows(errorCallback));
        });
        it('should throw errors with specified message', () => {
            throws(() => notThrows(errorCallback, 'Error happened'), /Error happened/);
        });
        it('should throw when error matches the provided RegExp', () => {
            throws(() => notThrows(errorCallback, /Correct/), /Expected function to not throw/);
        });
        it(`should not throw when error doesn't match the provided RegExp`, () => {
            notThrows(errorCallback, /Incorrect/);
        });
        it('should throw when error matches the provided constructor', () => {
            class CustomError extends Error { }
            throws(() => notThrows(() => { throw new CustomError(); }, CustomError), /Expected function to not throw a CustomError/);
        });
        it(`should not throw when error doesn't match the provided constructor`, () => {
            class CustomError extends Error { }
            notThrows(() => notThrows(() => { throw new Error(); }, CustomError));
        });
        it('should throw when error matches the provided predicate', () => {
            throws(() => notThrows(() => { throw new Error(); }, () => true), /Expected function to not throw/);
        });
        it(`should not throw when error doesn't match the provided predicate`, () => {
            notThrows(() => { throw new Error(); }, () => false);
        });
    });
});

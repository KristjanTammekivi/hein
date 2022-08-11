import { notRejects, rejects } from '../assert';

class FailError extends Error { }

const fail = () => {
    throw new FailError('Expected promise to reject');
};

describe('rejects', () => {
    class CustomError extends Error { }
    const reject = async (message = 'Things are bad') => {
        throw new Error(message);
    };
    const rejectCustomError = async () => {
        throw new CustomError('Things are bad');
    };
    it(`should reject if the callback doesn't reject`, async () => {
        try {
            await rejects(Promise.resolve());
            fail();
        } catch {
            return;
        }
    });
    it('should not throw if callback rejects', async () => {
        await rejects(Promise.reject(new Error()));
    });
    it('should throw with provided message', async () => {
        try {
            await rejects(Promise.resolve(), 'Things are not good');
            fail();
        } catch (e) {
            if (e instanceof FailError) {
                throw e;
            }
            if (e.message !== 'Things are not good') {
                throw new Error('Expected message to be "Things are not good"');
            }
        }
    });
    it(`should not throw if error message matches the provided RegExp`, async () => {
        await rejects(rejectCustomError(), /Things are bad/);
    });
    it(`should throw if error message doesn't match the provided RegExp`, async () => {
        await rejects(rejects(rejectCustomError(), /Things are good/), /Expected Promise to reject with an error matching \/Things are good\//);
    });
    it(`should throw with the provide message if error message doesn't match the provided RegExp`, async () => {
        await rejects(rejects(rejectCustomError(), /Things are good/, 'Damn'), /Damn/);
    });
    it(`should throw if error isn't an instance of the provided constructor`, async () => {
        await rejects(rejects(Promise.reject(new Error()), CustomError), /Expected Promise to reject with CustomError/);
    });
    it('should not throw if error is an instance of the provided constructor', async () => {
        await rejects(rejectCustomError(), CustomError);
    });
    it(`should throw with the provided message if error isn't an instance of the provided constructor`, async () => {
        await rejects(rejects(Promise.reject(new Error()), CustomError), /Expected Promise to reject with CustomError/);
    });
    it('should throw if error predicate function returns false for the thrown error', async () => {
        await rejects(rejects(Promise.reject(new Error('oops')), () => false), /Expected Error: oops to match predicate function/);
    });
    it('should not throw if error predicate function returns true for the thrown error', async () => {
        await rejects(Promise.reject(new Error()), () => true);
    });
    it('should throw with the provided message if error predicate function returns false for the thrown error', async () => {
        await rejects(rejects(Promise.reject(new Error()), () => false, 'Damn'), /Damn/);
    });
    describe('notRejects', () => {
        it(`should not reject if promise resolves`, async () => {
            await notRejects(Promise.resolve());
        });
        it('should reject if promise rejects', async () => {
            await rejects(notRejects(reject()), /Expected Promise to not reject/);
        });
        it('should reject with specified message', async () => {
            await rejects(notRejects(reject(), 'Error happened'), /Error happened/);
        });
        it('should throw when error matches the provided RegExp', async () => {
            await rejects(notRejects(reject('Correct'), /Correct/), /Expected Promise to not reject with an error matching \/Correct\//);
        });
        it(`should not throw when error doesn't match the provided RegExp`, async () => {
            await notRejects(reject('Correct'), /Incorrect/);
        });
        it('should throw when error matches the provided constructor', async () => {
            await rejects(notRejects(rejectCustomError(), CustomError), /Expected Promise to not reject with a CustomError/);
        });
        it(`should not throw when error doesn't match the provided constructor`, async () => {
            await notRejects(notRejects(reject(), CustomError));
        });
        it('should throw when error matches the provided predicate', async () => {
            await rejects(notRejects(reject(), () => true), /Expected Error: Things are bad to not match predicate function/);
        });
        it(`should not throw when error doesn't match the provided predicate`, async () => {
            await notRejects(reject(), () => false);
        });
    });
});

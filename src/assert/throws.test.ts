import { throws } from './throws';

describe('throws', () => {
    it(`should throw if the callback doesn't throw`, () => {
        try {
            throws(() => { });
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
        } catch (e) {
            if (e.message !== 'Things are bad') {
                throw new Error('Expected message to be "Things are bad"');
            }
            return;
        }
    });
    it(`should not throw if error message matches the provided RegExp`, () => {
        throws(() => {
            throw new Error('Things are bad');
        }, /Things are bad/);
    });
    it(`should throw if error message doesn't match the provided RegExp`, () => {
        const expectedMessage = `Expected 'Things are bad' to match /Things are good/`;
        try {
            throws(() => {
                throw new Error('Things are bad');
            }, /Things are good/);
        } catch (e) {
            if (e.message !== expectedMessage) {
                throw new Error(`Expected "${ e.message }" to equal "${ expectedMessage }"`);
            }
        }
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
        }, /Expected Error to be an instance of \[class CustomError extends Error\]/);
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
    it('should throw with the provided message if error predicate function returns false for the thrown error', () => {
        throws(() => {
            throws(() => { throw new Error('oops'); }, () => false, 'Damn');
        }, /Damn/);
    });
});

import { throws } from './throws';

describe('throws', () => {
    it(`should throw if the callback doesn't throw`, () => {
        try {
            throws(() => { });
        } catch {
            return;
        }
        throw new Error('Expected function to throw');
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
        throw new Error('Expected function to throw');
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
});

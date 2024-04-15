import { match, notMatch, throws } from '../assert';

describe('assert/match', () => {
    it('should not throw if regex matches actual', () => {
        match('abc', /abc/);
    });

    it('should throw if regex does not match actual', () => {
        throws(() => {
            match('abc', /def/);
        }, /Expected abc to match \/def\//);
    });

    describe('assert/notMatch', () => {
        it('should not throw if regex does not match actual', () => {
            notMatch('abc', /def/);
        });

        it('should throw if regex matches actual', () => {
            throws(() => {
                notMatch('abc', /abc/);
            }, /Expected abc to not match \/abc\//);
        });
    });
});

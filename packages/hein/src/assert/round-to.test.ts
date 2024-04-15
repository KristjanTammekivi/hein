import { notRoundTo, roundTo, throws } from '../assert';

describe('assert/roundTo', () => {
    it('should not throw if value rounds target integer', () => {
        roundTo(1.0002, 1);
    });

    it('should throw if value does not round to target', () => {
        throws(() => roundTo(1.15, 1.1, 1), /Expected 1\.15 to round to 1\.1*/);
    });

    it('should work with decimals', () => {
        roundTo(1.0005, 1.001, 3);
    });

    it('should round to nearest 10 when decimals is -1', () => {
        roundTo(11, 10, -1);
        throws(() => roundTo(15, 10, -1), /Expected 15 to round to 10/);
    });

    it('should throw if target has more decimal places than requested decimals', () => {
        throws(
            () => roundTo(1.11, 1.1, 0),
            /Invalid argument for target, decimals for target \(1.1\) cannot be less than rounding decimals \(0\)/
        );
    });

    describe('assert/notRoundTo', () => {
        it('should not throw if value does not round to target', () => {
            notRoundTo(1.15, 1.1, 1);
        });

        it('should throw if value rounds target integer', () => {
            throws(() => notRoundTo(1.0002, 1, 1), /Expected 1\.0002 to not round to 1/);
        });

        it('should throw if target has more decimal places than requested decimals', () => {
            throws(
                () => notRoundTo(1.11, 1.1, 0),
                /Invalid argument for target, decimals for target \(1.1\) cannot be less than rounding decimals \(0\)/
            );
        });
    });
});

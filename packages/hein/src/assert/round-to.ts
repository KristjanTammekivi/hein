import { createAssertion } from 'hein-assertion-utils';

export const [roundTo, notRoundTo] = createAssertion({
    messages: {
        miss: 'Expected {{actual}} to round to {{expected}}',
        tooManyDecimals: 'Invalid argument for target, decimals for target ({{expected}}) cannot be less than rounding decimals ({{decimals}})',
        not: 'Expected {{actual}} to not round to {{expected}}'
    },
    test: (report) => (actual: number, expected: number, decimals = 0) => {
        if (expected.toString().split('.')[1]?.length > decimals) {
            report({ status: 'notok', messageId: 'tooManyDecimals', expected, actual, data: { decimals }, noStringify: true });
            report({ status: 'ok', messageId: 'tooManyDecimals', expected, actual, data: { decimals }, noStringify: true });
            return true;
        }
        if (round(actual, decimals) === expected) {
            return report({ status: 'ok', expected, actual });
        }
        return report({ status: 'notok', messageId: 'miss', expected, actual });
    }
});

const round = (value: number, decimals: number) => {
    const factor = 10 ** decimals;
    return Math.round(value * factor) / factor;
};

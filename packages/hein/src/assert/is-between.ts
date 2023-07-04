import { createAssertion } from 'hein-assertion-utils';

interface IsBetweenOptions {
    inclusive?: boolean;
}

interface IsBetween {
    /**
     * check that date is Between another date
     */
    <T extends Date>(actual: T, start: T, end: T, options?: IsBetweenOptions): void;
    <T extends number>(actual: T, start: T, end: T, options?: IsBetweenOptions): void;
}

export const [isBetween, notBetween] = createAssertion({
    messages: {
        notBetween: 'Expected {{actual}} to be between {{start}} and {{end}}',
        not: 'Expected {{actual}} to not be between {{start}} and {{end}}'
    },
    test:
        (report): IsBetween =>
            <T extends Date | number>(actual: T, start: T, end: T, { inclusive = true }: IsBetweenOptions = {}) => {
                const inclusivelyBetween = actual <= end && actual >= start;
                const exclusivelyBetween = actual < end && actual > start;
                if (inclusive && !inclusivelyBetween) {
                    return report({
                        messageId: 'notBetween',
                        status: 'notok',
                        actual,
                        data: { start, end }
                    });
                }
                if (!inclusive && !exclusivelyBetween) {
                    return report({
                        messageId: 'notBetween',
                        status: 'notok',
                        actual,
                        data: { start, end }
                    });
                }
                return report({
                    status: 'ok',
                    actual,
                    data: { start, end }
                });
            }
});

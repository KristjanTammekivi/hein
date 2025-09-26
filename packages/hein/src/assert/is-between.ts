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
        notBetween: 'Expected {{= it.actual }} to be between {{= it.lesser }} and {{= it.greater }}',
        not: 'Expected {{= it.actual }} to not be between {{= it.lesser }} and {{= it.greater }}'
    },
    test:
        (report): IsBetween =>
        <T extends Date | number>(actual: T, start: T, end: T, { inclusive = true }: IsBetweenOptions = {}) => {
            const [greater, lesser] = end > start ? [end, start] : [start, end];
            const inclusivelyBetween = actual <= greater && actual >= lesser;
            const exclusivelyBetween = actual < greater && actual > lesser;
            if (inclusive && !inclusivelyBetween) {
                return report({
                    messageId: 'notBetween',
                    status: 'notok',
                    actual,
                    data: { lesser, greater }
                });
            }
            if (!inclusive && !exclusivelyBetween) {
                return report({
                    messageId: 'notBetween',
                    status: 'notok',
                    actual,
                    data: { lesser, greater }
                });
            }
            return report({
                status: 'ok',
                actual,
                data: { lesser, greater }
            });
        }
});

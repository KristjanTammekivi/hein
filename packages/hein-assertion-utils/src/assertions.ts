import * as mustache from 'mustache';
import { mapValues } from 'lodash';
import { stringify } from './stringify';

const { render } = mustache;

export class AssertionError extends Error {
    public showDiff = true;

    constructor(
        public actual: any,
        public expected: any,
        message: string
    ) {
        super(message);
        const originalPrepareStackTrace = Error.prepareStackTrace;
        Error.prepareStackTrace = (error, callsites) => {
            const filteredStacks = ['/hein-assertion-utils/', '/node_modules/', '/hein/'];
            let foreignCallsiteFound = false;
            callsites = callsites.filter((x) => {
                if (!x.getFileName()) {
                    return false;
                }
                if (x.getFileName().includes('.test.')) {
                    foreignCallsiteFound = true;
                    return true;
                }
                if (foreignCallsiteFound) {
                    return true;
                }
                if (filteredStacks.some((filter) => x.getFileName().includes(filter))) {
                    return false;
                }
                foreignCallsiteFound = true;
                return true;
            });
            return originalPrepareStackTrace(this, callsites);
        };

        const stack = this.stack;

        Error.prepareStackTrace = originalPrepareStackTrace;
        this.stack = stack;
    }
}

interface ReportOptions<T, U> {
    status: 'ok' | 'notok';
    messageId?: T;
    message?: string;
    expected?: U;
    actual?: U;
    noStringify?: boolean;
    data?: Record<string, any>;
}

export type Report<T> = <U>(args: ReportOptions<T, U>) => true | void;

interface AssertionArguments<T extends string, U extends (...args: any[]) => void> {
    messages: Record<T, string> & { not: string };
    test: (report: Report<T>) => U;
}

export const format = (message: string, data: Record<any, any>, noStringify: boolean) => {
    const escape = mustache.escape;
    (mustache as any).escape = (x: string) => x;
    const result = noStringify ? render(message, data) : render(message, mapValues(data, stringify));
    (mustache as any).escape = escape;
    return result;
};

export const createAssertion = <T extends string, U extends (...args: any[]) => void>({ messages, test }: AssertionArguments<T, U>) => {
    const factory = ({ inverted }: { inverted?: boolean } = {}) => {
        const report: Report<T> = ({ status, messageId, message, actual, expected, noStringify, data }) => {
            if (inverted && status === 'ok') {
                throw new AssertionError(
                    actual,
                    expected,
                    format(message || messages[messageId] || messages.not, { actual, expected, ...data }, noStringify)
                );
            }
            if (!inverted && status === 'notok') {
                throw new AssertionError(
                    actual,
                    expected,
                    format(message || messages[messageId], { actual, expected, ...data }, noStringify)
                );
            }
            return true;
        };
        return ((...args: any[]) => {
            return test(report)(...args);
        }) as U;
    };
    return [factory(), factory({ inverted: true })];
};

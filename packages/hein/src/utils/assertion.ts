import * as mustache from 'mustache';
import { mapValues } from 'lodash';
import { stringify } from './stringify';
import { State } from '../mixins';

// TODO: toggle this on and off inside format function
(mustache as any).escape = (x: string) => x;

const { render } = mustache;

export class AssertionError extends Error {
    public showDiff = true;

    constructor(public actual: any, public expected: any, message: string) {
        super(message);
    }
}

interface ReportOptions<T, U> {
    status: 'ok' | 'notok';
    messageId?: T;
    message?: string;
    expected?: U;
    actual?: U;
    noStringify?: boolean;
}

export type Report<T> = <U>(args: ReportOptions<T, U>) => true | void;

interface AssertionArguments<T extends string, U extends (...args: any[]) => void> {
    messages: Record<T, string> & { not: string; };
    test: (report: Report<T>) => U;
}

export const format = (message: string, data: Record<any, any>, noStringify: boolean) => {
    if (noStringify) {
        return render(message, data);
    }
    return render(message, mapValues(data, stringify));
};

export const createAssertion = <T extends string, U extends (...args: any[]) => void>({ messages, test }: AssertionArguments<T, U>) => {
    const factory = ({ inverted }: State<any> = {}) => {
        const report: Report<T> = ({ status, messageId, message, actual, expected, noStringify }) => {
            // console.trace({ status, messageId, message, actual, expected });
            if (inverted && status === 'ok') {
                throw new AssertionError(actual, expected, format(message || messages[messageId] || messages.not, { actual, expected }, noStringify));
            }
            if (!inverted && status === 'notok') {
                throw new AssertionError(actual, expected, format(message || messages[messageId], { actual, expected }, noStringify));
            }
            return true;
        };
        return ((...args: any[]) => {
            return test(report)(...args);
        }) as U;
    };
    return [factory(), factory({ inverted: true })];
};

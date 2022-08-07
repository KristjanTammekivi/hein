import { inspect } from 'loupe';
import { State } from './expect';
import * as mustache from 'mustache';
import { mapValues } from 'lodash';

// TODO: toggle this on and off inside format function
(mustache as any).escape = (x: string) => x;
const { render } = mustache;

export const stringify = (value: any) => {
    if (typeof value === 'string') {
        return `'${ value }'`;
    }
    if (value instanceof RegExp) {
        return value.toString();
    }
    if (value instanceof Error) {
        return `${ value.name }: ${ value.message }`;
    }
    return inspect(value);
};


export class AssertionError extends Error {
    public showDiff = true;

    constructor(public actual: any, public expected: any, message: string) {
        super(message);
    }
}

export const registerProperty = <T, U extends string, V extends () => any>(obj: T, name: U, value: V) => {
    Object.defineProperty(obj, name, {
        enumerable: true,
        get() {
            return value();
        },
    });
    return obj as T & Record<U, V>;
};

export const registerMethod = <T, U extends string, V>(obj: T, name: U, value: V) => {
    Object.defineProperty(obj, name, {
        value,
    });
    return obj as T & Record<U, V>;
};

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

const format = (message: string, data: Record<any, any>, noStringify: boolean) => {
    if (noStringify) {
        return render(message, data);
    }
    return render(message, mapValues(data, stringify));
};

export const createAssertion = <T extends string, U extends (...args: any[]) => void>({ messages, test }: AssertionArguments<T, U>) => {
    const factory = ({ inverted }: State = {}) => {
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

import { inspect } from 'node:util';

export const stringify = (value: any) => {
    if (typeof value === 'string') {
        return `'${ value }'`;
    }
    if (value instanceof RegExp) {
        return value.toString();
    }
    return inspect(value);
};

export class SameButDifferentAssertionError extends Error {
    constructor(public actual: any, public expected: any, message: string) {
        super(message);
    }
}

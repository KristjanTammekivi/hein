import { inspect } from 'node:util';

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

// TODO: use assertion-error module
export class AssertionError extends Error {
    constructor(public actual: any, public expected: any, message: string) {
        super(message);
    }
}

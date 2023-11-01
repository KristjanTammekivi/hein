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
    return inspect(value, { depth: Number.POSITIVE_INFINITY, breakLength: Number.POSITIVE_INFINITY, compact: true });
};

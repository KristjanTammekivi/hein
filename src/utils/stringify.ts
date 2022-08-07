import { inspect } from 'loupe';

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

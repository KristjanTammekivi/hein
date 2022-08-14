import { isPlainObject } from 'lodash';

export const getSize = (value: any) => {
    if (Array.isArray(value)) {
        return value.length;
    }
    if (isPlainObject(value)) {
        return Object.keys(value).length;
    }
    if (value instanceof Map) {
        return value.size;
    }
    if (value instanceof Set) {
        return value.size;
    }
    if (typeof value === 'string') {
        return value.length;
    }
    return 0;
};

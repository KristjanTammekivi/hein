import { isType, notIsType } from '../assert';
import { use } from '../mixins';
import { ValueType } from '../utils/get-type';

declare module '../expect.types' {
    interface NumberExpect<T> {
        /**
         * check if value is a number
         */
        number(): this;
        /**
         * check if value is a NaN
         */
        NaN(): this;
    }
    interface ArrayExpect<T> {
        /**
         * check if value is an array
         */
        array(): this;
    }
    interface BigIntExpect<T> {
        /**
         * check if value is a bigint
         */
        bigint(): this;
    }
    interface BooleanExpect {
        /**
         * check if value is a boolean
         */
        boolean(): this;
    }
    interface FunctionExpect<T> {
        /**
         * check if value is a function
         */
        function(): this;
    }
    interface ValueExpect<T> {
        /**
         * check if value is null
         */
        null(): this;
        /**
         * check if value is undefined
         */
        undefined(): this;
    }
    interface ObjectExpect<T> {
        /**
         * check if value is a plain object
         */
        object(): this;
    }
    interface StringExpect<T> {
        /**
         * check if value is a string
         */
        string(): this;
    }
    interface SymbolExpect<T> {
        /**
         * check if value is a symbol
         */
        symbol(): this;
    }
}

const types: ValueType[] = [
    'NaN',
    'array',
    'bigint',
    'boolean',
    'function',
    'null',
    'number',
    'object',
    'string',
    'symbol',
    'undefined'
];

use(Object.fromEntries(types.map(type => {
    return [type, {
        type: 'method',
        value: ({ value, inverted }) => () => {
            if (inverted) {
                notIsType(value, type);
            } else {
                isType(value, type);
            }
        }
    }];
})));

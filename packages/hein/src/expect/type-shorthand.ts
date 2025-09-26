import { isType, notIsType } from '../assert.js';
import { use } from '../mixins.js';
import { type ValueType } from '../utils/get-type.js';

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

use(
    Object.fromEntries(
        types.map((type) => {
            return [
                type,
                {
                    type: 'method',
                    value:
                        ({ value, inverted }) =>
                        () => {
                            if (inverted) {
                                notIsType(value, type);
                            } else {
                                isType(value, type);
                            }
                        }
                }
            ];
        })
    )
);

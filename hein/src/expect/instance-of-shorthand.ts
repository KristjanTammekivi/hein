import { instanceOf, notInstanceOf } from '../assert';
import { use } from '../mixins';

declare module '../expect.types' {
    interface DateExpect {
        /**
         * check if value is an instance of Date
         */
        Date(): this
    }
    interface ObjectExpect<T> {
        /**
         * check if value is an instance of Map
         */
        Map(): this
        /**
         * check if value is an instance of Set
         */
        Set(): this
        /**
         * check if value is an instance of WeakMap
         */
        WeakMap(): this
        /**
         * check if value is an instance of WeakSet
         */
        WeakSet(): this
    }
}

const constructors = [
    Date,
    Map,
    Set,
    WeakMap,
    WeakSet
];

use(Object.fromEntries(constructors.map((constructor) => {
    return [constructor.name, {
        type: 'method',
        value: ({ inverted, value }) => () => {
            if (inverted) {
                notInstanceOf(value, constructor);
            } else {
                instanceOf(value, constructor);
            }
        }
    }];
})));

import { equal, notEqual } from '../assert';
import { State, use } from '../mixins';
import { format } from 'hein-assertion-utils';

declare module '../expect.types' {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface BooleanExpect<T> {
        /**
         * check if value is true
         */
        true(): this;
        /**
         * check if value is false
         */
        false(): this;
    }
}

const values = {
    false: false,
    true: true
};

use(Object.fromEntries(Object.entries(values).map(([key, expectValue]) => {
    return [key, {
        type: 'method',
        value: ({ inverted, value }: State<any>) => () => {
            if (inverted) {
                const message = format(
                    'Expected {{ value }} to not be {{ key }}',
                    {
                        key,
                        value
                    },
                    true
                );
                notEqual(value, expectValue, message);
            } else {
                const message = format(
                    'Expected {{ value }} to be {{ key }}',
                    {
                        key,
                        value
                    },
                    true
                );
                equal(value, expectValue, message);
            }
        }
    }];
})));

import { equal, notEqual } from '../assert.js';
import { type State, use } from '../mixins.js';
import { format } from 'hein-assertion-utils';

const values = {
    false: false,
    true: true
};

use(
    Object.fromEntries(
        Object.entries(values).map(([key, expectValue]) => {
            return [
                key,
                {
                    type: 'method',
                    value:
                        ({ inverted, value }: State<any>) =>
                        () => {
                            if (inverted) {
                                const message = format(
                                    'Expected {{= it.value }} to not be {{= it.key }}',
                                    {
                                        key,
                                        value
                                    },
                                    true
                                );
                                notEqual(value, expectValue, message);
                            } else {
                                const message = format(
                                    'Expected {{= it.value }} to be {{= it.key }}',
                                    {
                                        key,
                                        value
                                    },
                                    true
                                );
                                equal(value, expectValue, message);
                            }
                        }
                }
            ];
        })
    )
);

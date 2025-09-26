import { instanceOf, notInstanceOf } from '../assert.js';
import { use } from '../mixins.js';

const constructors = [Date, Map, Set, WeakMap, WeakSet];

use(
    Object.fromEntries(
        constructors.map((constructor) => {
            return [
                constructor.name,
                {
                    type: 'method',
                    value:
                        ({ inverted, value }) =>
                        () => {
                            if (inverted) {
                                notInstanceOf(value, constructor);
                            } else {
                                instanceOf(value, constructor);
                            }
                        }
                }
            ];
        })
    )
);

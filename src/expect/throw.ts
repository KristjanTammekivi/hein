import { notThrows, throws } from '../assert';
import { State, use } from '../mixins';

use({
    throw: {
        type: 'method',
        value: ({ value, inverted }: State<any>) => (...args: any[]) => {
            return inverted ? notThrows(value, ...args) : throws(value, ...args);
        }
    }
});

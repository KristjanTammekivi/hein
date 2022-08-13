import { notRejects, rejects } from '../assert';
import { State, use } from '../mixins';

use({
    reject: {
        type: 'method',
        value: ({ value, inverted }: State<any>) => (...args: any[]) => {
            return inverted ? rejects(value, ...args) : notRejects(value, ...args);
        }
    }
});

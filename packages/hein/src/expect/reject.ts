import { notRejects, rejects } from '../assert.js';
import { type State, use } from '../mixins.js';

use({
    reject: {
        type: 'method',
        value:
            ({ value, inverted }: State<any>) =>
            (...args: any[]) => {
                return inverted ? notRejects(value, ...args) : rejects(value, ...args);
            }
    }
});

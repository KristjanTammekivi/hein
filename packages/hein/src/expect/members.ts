import { hasMembers, notHasMembers } from '../assert.js';
import { use } from '../mixins.js';

use({
    members: {
        type: 'method',
        value:
            ({ value, inverted, same, deep, ordered, partial }) =>
            (other: any, message?: string) => {
                if (inverted) {
                    notHasMembers(value, other, { deep, same, ordered, partial }, message);
                } else {
                    hasMembers(value, other, { deep, same, ordered, partial }, message);
                }
            }
    },
    same: {
        type: 'property',
        value: (state) => {
            state.same = true;
            return state;
        }
    },
    ordered: {
        type: 'property',
        value: (state) => {
            state.ordered = true;
            return state;
        }
    }
});

import { hasMembers, notHasMembers } from '../assert';
import { use } from '../mixins';
import { DeepPartial } from '../utils/types';

type InferArray<T> = T extends Array<infer U> ? U : never;

declare module '../expect.types' {
    interface ArrayExpect<T> {
        /**
         * check that the members in second array are present in the first one
         */
        members(value: InferArray<T>[], message?: string): this;
        same: ArrayExpect<T>;
        ordered: ArrayExpect<T>;
        /**
         * Use partial matching for objects
         * @example
         * expect({ a: 1, b: 2 }).to.partially.eql({ a: 1 });
         */
        partially: ArrayExpect<DeepPartial<T>>;
    }
}

use({
    members: {
        type: 'method',
        value: ({ value, inverted, same, deep, ordered, partial }) => (other: any, message?: string) => {
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

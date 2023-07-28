import { includes, notIncludes } from '../assert';
import { use } from '../mixins';

type ArrayType<T> = T extends (infer U)[] ? U : T;

declare module '../expect.types' {
    interface ArrayExpect<T> {
        /**
         * check if array includes element(s)
         */
        include(...elements: ArrayType<T>[]): this;
        /**
         * check if array includes element(s)
         */
        contain(...elements: ArrayType<T>[]): this;
    }
    interface StringExpect {
        /**
         * check if string includes substring(s)
         */
        include(...substrings: string[]): this;
        /**
         * check if string includes substring(s)
         */
        contain(...substrings: string[]): this;
    }
}

use({
    include: {
        type: 'method',
        value:
            ({ value, inverted }) =>
            (...elements: any[]) => {
                if (inverted) {
                    notIncludes(value, ...elements);
                } else {
                    includes(value, ...elements);
                }
            }
    },
    contain: {
        type: 'alias',
        value: 'include'
    }
});

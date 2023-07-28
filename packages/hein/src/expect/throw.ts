import { notThrows, throws } from '../assert';
import { State, use } from '../mixins';
import { Constructor, ErrorPredicate } from '../utils/process-error';

declare module '../expect.types' {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface FunctionExpect<T> {
        /**
         * check if function throws
         * @param message
         */
        throw(message?: string): this;
        throw(matcher: RegExp | Constructor<Error> | ErrorPredicate, message?: string): this;
    }
}

use({
    throw: {
        type: 'method',
        value:
            ({ value, inverted }: State<any>) =>
            (...args: any[]) => {
                return inverted ? notThrows(value, ...args) : throws(value, ...args);
            }
    }
});

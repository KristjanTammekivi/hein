import { notThrows, throws } from '../assert';
import { State, use } from '../mixins';
import { Constructor, ErrorPredicate } from '../utils/process-error';

declare module '../expect.types' {
    interface FunctionExpect<T> {
        throw(message?: string): this;
        throw(matcher: RegExp | Constructor<Error> | ErrorPredicate, message?: string): this;
    }
}

use({
    throw: {
        type: 'method',
        value: ({ value, inverted }: State<any>) => (...args: any[]) => {
            return inverted ? notThrows(value, ...args) : throws(value, ...args);
        }
    }
});

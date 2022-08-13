import { notRejects, rejects } from '../assert';
import { State, use } from '../mixins';
import { Constructor, ErrorPredicate } from '../utils/process-error';

declare module '../expect.types' {
    interface PromiseExpect<T> {
        reject(message?: string): Promise<void>;
        reject(matcher: RegExp | Constructor<Error> | ErrorPredicate): Promise<void>;
    }
}

use({
    reject: {
        type: 'method',
        value: ({ value, inverted }: State<any>) => (...args: any[]) => {
            return inverted ? rejects(value, ...args) : notRejects(value, ...args);
        }
    }
});

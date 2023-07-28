import { notRejects, rejects } from '../assert';
import { State, use } from '../mixins';
import { Constructor, ErrorPredicate } from '../utils/process-error';

declare module '../expect.types' {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface PromiseExpect<T> {
        /**
         * check if promise rejects
         * @param message
         */
        reject(message?: string): Promise<void>;
        reject(matcher: RegExp | Constructor<Error> | ErrorPredicate): Promise<void>;
    }
}

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

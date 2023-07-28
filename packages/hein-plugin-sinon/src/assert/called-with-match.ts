import { createAssertion } from 'hein-assertion-utils';
import type { SinonSpy } from 'sinon';

export const [calledWithMatch, notCalledWithMatch] = createAssertion({
    messages: {
        assert: 'Expected spy to have been called with arguments',
        not: 'Expected spy to not have been called with arguments'
    },
    test:
        (report) =>
        (spy: SinonSpy, ...args: any[]) => {
            if (spy.calledWithMatch(...args)) {
                report({
                    status: 'ok'
                });
                return;
            }
            report({
                messageId: 'assert',
                status: 'notok'
            });
        }
});

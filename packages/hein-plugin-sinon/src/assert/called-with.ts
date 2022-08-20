import { createAssertion } from 'hein-assertion-utils';
import type { SinonSpy } from 'sinon';

export const [calledWith, notCalledWith] = createAssertion({
    messages: {
        assert: 'Expected spy to have been called with arguments',
        not: 'Expected spy to not have been called with arguments'
    },
    test: (report) => (spy: SinonSpy, ...args: any[]) => {
        if (spy.calledWith(...args)) {
            report({
                messageId: 'assert',
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

import { createAssertion } from 'hein-assertion-utils';
import type { SinonSpy } from 'sinon';

export const [calledBefore, notCalledBefore] = createAssertion({
    messages: {
        assert: 'Expected spy to have been called before other',
        not: 'Expected spy to not have been called before other'
    },
    test: (report) => (spy: SinonSpy, otherSpy: SinonSpy) => {
        if (spy.calledBefore(otherSpy)) {
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

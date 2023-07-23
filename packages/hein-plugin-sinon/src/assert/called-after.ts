import { createAssertion } from 'hein-assertion-utils';
import type { SinonSpy } from 'sinon';

export const [calledAfter, notCalledAfter] = createAssertion({
    messages: {
        assert: 'Expected spy to have been called after other',
        not: 'Expected spy to not have been called after other'
    },
    test: (report) => (spy: SinonSpy, otherSpy: SinonSpy) => {
        if (spy.calledAfter(otherSpy)) {
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

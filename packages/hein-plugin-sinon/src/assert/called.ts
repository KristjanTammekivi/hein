import { AssertionError, createAssertion } from 'hein-assertion-utils';
import type { SinonSpy } from 'sinon';

export const [called, notCalled] = createAssertion({
    messages: {
        assert: 'Expected spy to have been called',
        not: 'Expected spy to not have been called'
    },
    test: (report) => (spy: SinonSpy) => {
        if (!('callCount' in spy)) {
            throw new AssertionError(typeof spy, 'SinonSpy', 'Invalid argument');
        }
        if (spy.callCount < 1) {
            report({
                actual: spy.callCount,
                expected: 1,
                messageId: 'assert',
                status: 'notok'
            });
            return;
        }
        report({
            actual: spy.callCount,
            expected: 1,
            messageId: 'assert',
            status: 'ok'
        });
    }
});

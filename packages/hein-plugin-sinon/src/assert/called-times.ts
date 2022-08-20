import { AssertionError, createAssertion } from 'hein/utils/assertion';
import type { SinonSpy } from 'sinon';

export const [calledTimes, notCalledTimes] = createAssertion({
    messages: {
        assert: 'Expected spy to have been called {{ expected }} times',
        not: 'Expected spy to not have been called {{ expected }} times'
    },
    test: (report) => (spy: SinonSpy, callCount: number) => {
        if (!('callCount' in spy)) {
            throw new AssertionError(typeof spy, 'SinonSpy', 'Invalid argument');
        }
        if (spy.callCount !== callCount) {
            report({
                actual: spy.callCount,
                expected: callCount,
                messageId: 'assert',
                status: 'notok'
            });
            return;
        }
        report({
            actual: spy.callCount,
            expected: callCount,
            messageId: 'assert',
            status: 'ok'
        });
    }
});

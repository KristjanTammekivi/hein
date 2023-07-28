import { createAssertion } from 'hein-assertion-utils';
import { match } from '../utils/match';

interface HasMembersOptions {
    /**
     * check for deep equality (ie {a: 1} === {a: 1})
     * @default false
     * @example
     * hasMembers([{ a: 1 }], [{ a: 1 }], { deep: true });
     */
    deep?: boolean;
    /**
     * use partial matching (ie {a: 1, b: 2} === {a: 1})
     * implies deep
     * @default false
     * @example
     * hasMembers([{ a: 1, b: 2 }], [{ a: 1 }], { partial: true });
     */
    partial?: boolean;
    /**
     * check that all the members in the first array are present in the second one
     * @default false
     * @example
     * hasMembers([1, 2], [2, 1], { same: true });
     * notHasMembers([1, 2], [1], { same: true});
     */
    same?: boolean;
    /**
     * check that the members in the first array are in the same order as the second one
     * @default false
     * @example
     * hasMembers([1, 2], [1, 2], { ordered: true });
     * notHasMembers([1, 2], [2, 1], { ordered: true });
     */
    ordered?: boolean;
}

interface HasMembers {
    /**
     * check that the members in second array are present in the first one
     * @example
     * hasMembers([1], [1]);
     * hasMembers([1, 2], [2, 1]);
     * hasMembers([{ a: 1 }], [{ a: 1 }], { deep: true });
     */
    <T>(actual: T[], expected: T[], options?: HasMembersOptions, message?: string): void;
}

export const [hasMembers, notHasMembers] = createAssertion({
    messages: {
        hasMembers: 'Expected {{actual}} to have members {{expected}}',
        same: 'Expected {{actual}} to have same members as {{expected}}',
        order: 'Expected {{actual}} to have ordered members {{expected}}',
        not: 'Expected {{actual}} to not have members {{expected}}',
        notSame: 'Expected {{actual}} to not have same members as {{expected}}'
    },
    test:
        (report): HasMembers =>
        <T>(
            actual: T[],
            expected: T[],
            { deep = false, partial = false, ordered = false, same = false }: HasMembersOptions = {},
            message?: string
        ) => {
            let lastIndex = -1;
            for (const item of expected) {
                if (deep || partial) {
                    // eslint-disable-next-line @typescript-eslint/no-loop-func
                    const actualIndex = actual.findIndex((actualItem, index) => {
                        if (!ordered) {
                            return match(actualItem, item, { partial });
                        }
                        if (lastIndex >= index) {
                            return false;
                        }
                        return match(actualItem, item, { partial });
                    });
                    lastIndex = actualIndex;
                    if (actualIndex === -1) {
                        return report({ status: 'notok', messageId: ordered ? 'order' : 'hasMembers', actual, expected, message });
                    }
                } else {
                    if (actual.includes(item)) {
                        if (ordered && lastIndex >= actual.indexOf(item, lastIndex + 1)) {
                            return report({ status: 'notok', messageId: 'order', actual, expected, message });
                        }
                        lastIndex = actual.indexOf(item, lastIndex + 1);
                    } else {
                        return report({ status: 'notok', messageId: 'hasMembers', actual, expected, message });
                    }
                }
            }
            if (same && actual.length !== expected.length) {
                return report({ status: 'notok', messageId: 'same', actual, expected, message });
            }
            return report({ status: 'ok', messageId: same ? 'notSame' : 'not', actual, expected, message });
        }
});

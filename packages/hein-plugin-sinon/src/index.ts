import type { Method, Property, State } from 'hein';

import 'hein/expect.types';
import type { SinonMatcher, SinonSpy } from 'sinon';
import { called, notCalled } from './assert/called';
import { calledAfter, notCalledAfter } from './assert/called-after';
import { calledBefore, notCalledBefore } from './assert/called-before';
import { calledTimes, notCalledTimes } from './assert/called-times';
import { calledWith, notCalledWith } from './assert/called-with';
import { calledWithMatch, notCalledWithMatch } from './assert/called-with-match';
type MaybeSinonMatch<T> = T extends SinonMatcher
    ? T
    : T extends (infer U)[]
    ? {
          [K in keyof T]: MaybeSinonMatch<U>;
      }
    : T extends object
    ? {
          [K in keyof T]: MaybeSinonMatch<T[K]>;
      }
    : T | SinonMatcher;
declare module 'hein/expect.types' {
    interface ValueExpect<T> {
        called(callCount?: number): this;
        calledOnce(): this;
        calledTwice(): this;
        calledThrice(): this;
        calledBefore(spy: SinonSpy): this;
        calledAfter(spy: SinonSpy): this;
        calledWith: (...args: T extends SinonSpy ? Parameters<T> : any) => this;
        calledWithMatch: (...args: T extends SinonSpy ? MaybeSinonMatch<Parameters<T>> : any) => this;
        been: this;
    }
}

export const sinonPlugin: Record<string, Method | Property> = {
    been: {
        type: 'property',
        value: () => null
    },
    called: {
        type: 'method',
        value:
            ({ inverted, value }: State<SinonSpy>) =>
            (callCount: number) => {
                if (typeof callCount === 'number') {
                    if (inverted) {
                        notCalledTimes(value, callCount);
                    } else {
                        calledTimes(value, callCount);
                    }
                    return;
                }
                if (inverted) {
                    notCalled(value);
                } else {
                    called(value);
                }
            }
    },
    calledOnce: {
        type: 'method',
        value:
            ({ inverted, value }: State<SinonSpy>) =>
            () => {
                if (inverted) {
                    notCalledTimes(value, 1);
                } else {
                    calledTimes(value, 1);
                }
            }
    },
    calledTwice: {
        type: 'method',
        value:
            ({ inverted, value }: State<SinonSpy>) =>
            () => {
                if (inverted) {
                    notCalledTimes(value, 2);
                } else {
                    calledTimes(value, 2);
                }
            }
    },
    calledThrice: {
        type: 'method',
        value:
            ({ inverted, value }: State<SinonSpy>) =>
            () => {
                if (inverted) {
                    notCalledTimes(value, 3);
                } else {
                    calledTimes(value, 3);
                }
            }
    },
    calledBefore: {
        type: 'method',
        value:
            ({ inverted, value }: State<SinonSpy>) =>
            (spy: SinonSpy) => {
                if (inverted) {
                    notCalledBefore(value, spy);
                } else {
                    calledBefore(value, spy);
                }
            }
    },
    calledAfter: {
        type: 'method',
        value:
            ({ inverted, value }: State<SinonSpy>) =>
            (spy: SinonSpy) => {
                if (inverted) {
                    notCalledAfter(value, spy);
                } else {
                    calledAfter(value, spy);
                }
            }
    },
    calledWith: {
        type: 'method',
        value:
            ({ inverted, value }: State<SinonSpy>) =>
            (...args: any[]) => {
                if (inverted) {
                    notCalledWith(value, ...args);
                } else {
                    calledWith(value, ...args);
                }
            }
    },
    calledWithMatch: {
        type: 'method',
        value:
            ({ inverted, value }: State<SinonSpy>) =>
            (...args: any[]) => {
                if (inverted) {
                    notCalledWithMatch(value, ...args);
                } else {
                    calledWithMatch(value, ...args);
                }
            }
    }
};

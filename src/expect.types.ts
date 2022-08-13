/* eslint-disable @typescript-eslint/no-empty-interface */
import { ThrowsCallback } from './assert/throws';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface ValueExpect<T> {
    to: this;
    be: this;
    not: this;
    and: this;
    have: this;
    of: this;
}

export interface FunctionExpect<T> extends ValueExpect<T> { }

export interface PromiseExpect<T> extends ValueExpect<T> { }

export interface NumberExpect<T = number> extends ValueExpect<T> { }

export interface StringExpect<T = string> extends ValueExpect<T> { }

export interface ObjectExpect<T> extends ValueExpect<T> {
    size: NumberExpect<number>;
}

export interface DateExpect<T = Date> extends ValueExpect<T>, ObjectExpect<T> { }

export interface ArrayExpect<T> extends ValueExpect<T>, ObjectExpect<T> {
    length: NumberExpect<number> & this;
}

export interface Expect {
    <T extends ThrowsCallback>(actual: T): FunctionExpect<T>;
    <T extends Promise<any>>(actual: T): PromiseExpect<T>;
    <T extends any[]>(actual: T): ArrayExpect<T>;
    <T extends Date>(actual: T): DateExpect<T>;
    <T extends Record<string, any>>(actual: T): ObjectExpect<T>;
    <T extends number>(actual: T): NumberExpect;
    <T extends string>(actual: T): StringExpect;
    <T>(actual: T): ValueExpect<T>;
}

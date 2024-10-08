/* eslint-disable @typescript-eslint/no-empty-object-type */
import { ThrowsCallback } from './assert/throws';
import type { fail } from './utils/fail';
export { State } from './mixins';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface ValueExpect<T> {
    to: this;
    be: this;
    a: this;
    an: this;
    not: this;
    and: this;
    have: this;
    in: this;
    of: this;
    /**
     * Use deep equality for object checks
     */
    deep: this;
}

type ArrayType<T> = T extends (infer U)[] ? U : never;

export interface ArrayExpect<T> extends ValueExpect<T>, ObjectExpect<T> {
    length: NumberExpect<number> & this;
    array(): this;
    every: GetExpectType<ArrayType<T>>;
}
export interface BigIntExpect<T = bigint> extends NumberExpect<T> {}
export interface BooleanExpect<T = boolean> extends ValueExpect<T> {}
export interface DateExpect<T = Date> extends ValueExpect<T>, ObjectExpect<T> {}
export interface FunctionExpect<T> extends ValueExpect<T> {}
export interface NumberExpect<T = number> extends ValueExpect<T> {}
export interface MapExpect<T> extends ValueExpect<T> {
    size: NumberExpect<number>;
}
export interface ObjectExpect<T> extends ValueExpect<T> {
    size: NumberExpect<number>;
}
export interface PromiseExpect<T> extends ValueExpect<T> {}
export interface StringExpect<T = string> extends ValueExpect<T> {}
export interface SymbolExpect<T> extends ValueExpect<T> {}

const LooseSymbol: unique symbol = Symbol();

export interface Loose {
    [LooseSymbol]: true;
}

type AllExpects<T> = ArrayExpect<T> &
    BigIntExpect<T> &
    BooleanExpect<T> &
    DateExpect<T> &
    FunctionExpect<T> &
    NumberExpect<T> &
    MapExpect<T> &
    ObjectExpect<T> &
    PromiseExpect<T> &
    StringExpect<T> &
    SymbolExpect<T> &
    ValueExpect<T>;

export interface Expect {
    <T extends Loose>(actual: T): AllExpects<T>;
    <T extends ThrowsCallback>(actual: T): FunctionExpect<T>;
    <T extends Promise<any>>(actual: T): PromiseExpect<T>;
    <T extends any[]>(actual: T): ArrayExpect<T>;
    <T extends Date>(actual: T): DateExpect<T>;
    <T extends Map<any, any>>(actual: T): MapExpect<T>;
    <T extends Record<string, any>>(actual: T): ObjectExpect<T>;
    <T extends number>(actual: T): NumberExpect;
    <T extends bigint>(actual: T): BigIntExpect;
    <T extends boolean>(actual: T): BooleanExpect;
    <T extends string>(actual: T): StringExpect;
    <T extends symbol>(actual: T): SymbolExpect<T>;
    <T>(actual: T): ValueExpect<T>;
    fail: typeof fail;
}

type GetExpectType<T> = T extends number ? NumberExpect<T> : AllExpects<T>;

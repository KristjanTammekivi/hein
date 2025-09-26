import { type Constructor, type ErrorPredicate } from './utils/process-error.js';
import { type ValueType } from './utils/get-type.js';
export { type State } from './mixins.js';

type DeepPartial<T> = {
    [P in keyof T]?: T[P] | (T[P] extends Array<infer U> ? Array<DeepPartial<U>> : DeepPartial<T[P]>);
};

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
    /**
     * check for deep equality
     */
    eql(value: T, message?: string): this;
    partially: ValueExpect<DeepPartial<T>>;
    /**
     * check for === equality, NaN is considered equal to NaN
     */
    equal(value: T, message?: string): this;
    /**
     * check for === equality, NaN is considered equal to NaN
     */
    eq(value: T, message?: string): this;
    /**
     * check if value has a property
     * @param property a property in the object. When combined with .deep. can be a path like 'a.b.c'
     * @example expect({a: {b: {c: 1}}}).to.have.property('a.b.c');
     * @example expect({a: {b: {c: 1}}}).to.have.deep.property('[0].a.b.c');
     */
    property<K extends keyof T>(property: K): this;
    /**
     * check if value has a property
     * @param property a property in the object. When combined with .deep. can be a path like 'a.b.c'
     * @example expect({a: {b: {c: 1}}}).to.have.property('a.b.c');
     * @example expect({a: {b: {c: 1}}}).to.have.deep.property('[0].a.b.c');
     */
    property(property: string): this;
    /**
     * check if value has a property
     * @param property a property in the object. When combined with .deep. can be a path like 'a.b.c'
     * @param value
     * @example expect({a: {b: {c: 1}}}).to.have.property('a.b.c');
     * @example expect({a: {b: {c: 1}}}).to.have.deep.property('[0].a.b.c');
     */
    property<K extends keyof T>(property: K, value?: any): this;
    /**
     * check if value has a property
     * @param property a property in the object. When combined with .deep. can be a path like 'a.b.c'
     * @param value
     * @example expect({a: {b: {c: 1}}}).to.have.property('a.b.c');
     * @example expect({a: {b: {c: 1}}}).to.have.deep.property('[0].a.b.c');
     */
    property(property: string, value?: any): this;
    /**
     * check if instance of value
     * @param constructor - The constructor function to check against
     */
    instanceOf(constructor: Constructor): this;
    /**
     * check if value is null
     */
    null(): this;
    /**
     * check if value is undefined
     */
    undefined(): this;
    /**
     * check if value is of certain type
     */
    type(type: ValueType): this;
}

type ArrayType<T, DT = never> = T extends (infer U)[] ? U : DT;

export interface ArrayExpect<T> extends ValueExpect<T>, ObjectExpect<T> {
    length: NumberExpect<number> & this;
    array(): this;
    every: GetExpectType<ArrayType<T>>;
    /**
     * check if array includes element(s)
     */
    include(...elements: ArrayType<T>[]): this;
    /**
     * check if array includes element(s)
     */
    contain(...elements: ArrayType<T>[]): this;
    /**
     * check for array length
     */
    lengthOf(length: number, message?: string): this;
    /**
     * check that the members in second array are present in the first one
     */
    members(value: ArrayType<T, any>[], message?: string): this;
    same: ArrayExpect<T>;
    ordered: ArrayExpect<T>;
    /**
     * Use partial matching for objects
     * @example
     * expect({ a: 1, b: 2 }).to.partially.eql({ a: 1 });
     */
    partially: ArrayExpect<DeepPartial<T>>;
    /**
     * check if value is an array
     */
    array(): this;
}
export interface BigIntExpect<T = bigint> extends NumberExpect<T> {
    /**
     * check if value is a bigint
     */
    bigint(): this;
}
export interface BooleanExpect<T = boolean> extends ValueExpect<T> {
    /**
     * check if value is a boolean
     */
    boolean(): this;
    /**
     * check if value is true
     */
    true(): this;
    /**
     * check if value is false
     */
    false(): this;
}
export interface DateExpect<T = Date> extends ValueExpect<T>, ObjectExpect<T> {
    /**
     * check if date is after other date
     * @param date
     */
    after(date: Date): this;
    /**
     * check if date is before other date
     * @param date
     */
    before(date: Date): this;
    /**
     * check if date is between other dates
     * @param start
     * @param end
     */
    between(start: Date, end: Date, inclusive?: boolean): this;
    /**
     * check if actual is greater than or equal to expected
     */
    greaterThanOrEqual(value: T): this;
    /**
     * check if actual is greater than or equal to expected
     */
    gte(value: T): this;
    /**
     * check if actual is greater than or equal to expected
     */
    atLeast(value: T): this;
    /**
     * check if actual is greater than expected
     */
    greaterThan(value: T): this;
    /**
     * check if actual is greater than expected
     */
    gt(value: T): this;
    /**
     * check if actual is greater than expected
     */
    above(value: T): this;
    /**
     * check if value is an instance of Date
     */
    Date(): this;
    /**
     * check if actual is less than or equal to expected
     */
    lessThanOrEqual(value: T): this;
    /**
     * check if actual is less than or equal to expected
     */
    lte(value: T): this;
    /**
     * check if actual is less than or equal to expected
     */
    atMost(value: T): this;
    /**
     * check if actual is less than expected
     */
    lessThan(value: T): this;
    /**
     * check if actual is less than expected
     */
    lt(value: T): this;
    /**
     * check if actual is less than expected
     */
    below(value: T): this;
}
export interface FunctionExpect<T> extends ValueExpect<T> {
    /**
     * check if function throws
     * @param message
     */
    throw(message?: string): this;
    throw(matcher: RegExp | Constructor<Error> | ErrorPredicate, message?: string): this;
    /**
     * check if value is a function
     */
    function(): this;
}
export interface NumberExpect<T = number> extends ValueExpect<T> {
    /**
     * check if number close enough (default 10%)
     * @param ballpark
     * @param [multiplier=10] - a number between 0 and 1 (exclusive). 0.1 (default) means 10% difference is allowed.
     */
    ballpark(ballpark: number, multiplier?: number): this;
    /**
     * check if number is between other numbers
     * @param start
     * @param end
     * @param inclusive
     */
    between(start: number, end: number, inclusive?: boolean): this;
    /**
     * check if actual is greater than or equal to expected
     */
    greaterThanOrEqual(value: T): this;
    /**
     * check if actual is greater than or equal to expected
     */
    gte(value: T): this;
    /**
     * check if actual is greater than or equal to expected
     */
    atLeast(value: T): this;
    /**
     * check if actual is greater than expected
     */
    greaterThan(value: T): this;
    /**
     * check if actual is greater than expected
     */
    gt(value: T): this;
    /**
     * check if actual is greater than expected
     */
    above(value: T): this;
    /**
     * check if actual is less than or equal to expected
     */
    lessThanOrEqual(value: T): this;
    /**
     * check if actual is less than or equal to expected
     */
    lte(value: T): this;
    /**
     * check if actual is less than or equal to expected
     */
    atMost(value: T): this;
    /**
     * check if actual is less than expected
     */
    lessThan(value: T): this;
    /**
     * check if actual is less than expected
     */
    lt(value: T): this;
    /**
     * check if actual is less than expected
     */
    below(value: T): this;
    /**
     * check if number close enough (default 10%)
     * @param target
     * @param decimal defaults to 0, can be negative if trying to round down to nearest 10, 100, etc
     */
    roundTo(target: number, decimal?: number): this;
    /**
     * check if value is a number
     */
    number(): this;
    /**
     * check if value is a NaN
     */
    NaN(): this;
}

type InferMapKeys<T> = T extends Map<infer K, any> ? K : never;

export interface MapExpect<T> extends ValueExpect<T> {
    size: NumberExpect<number>;
    /**
     * check if Map is empty
     */
    empty(message?: string): this;
    /**
     * check if value is an instance of Map
     */
    Map(): this;
    /**
     * Check if value has keys
     */
    keys<K extends InferMapKeys<T>>(keys: K[] | K): this;
    /**
     * check for Map to have a certain size
     */
    sizeOf(size: number, message?: string): this;
}
export interface ObjectExpect<T> extends ValueExpect<T> {
    size: NumberExpect<number>;
    /**
     * check if object/array/Map/Set is empty
     */
    empty(message?: string): this;
    /**
     * exclude keys from object to be compared further down the chain
     * @param keys
     */
    excluding<K extends keyof T>(...keys: K[]): ObjectExpect<Omit<T, K>>;
    /**
     * check if value is an instance of Map
     */
    Map(): this;
    /**
     * check if value is an instance of Set
     */
    Set(): this;
    /**
     * check if value is an instance of WeakMap
     */
    WeakMap(): this;
    /**
     * check if value is an instance of WeakSet
     */
    WeakSet(): this;
    /**
     * Check if value has keys
     */
    keys<K extends keyof T>(keys: K[] | K): this;
    /**
     * check for object/array/Map/Set/string to have a certain size
     */
    sizeOf(size: number, message?: string): this;
    /**
     * check if value is a plain object
     */
    object(): this;
}
export interface PromiseExpect<T> extends ValueExpect<T> {
    /**
     * check if promise rejects
     * @param message
     */
    reject(message?: string): Promise<void>;
    reject(matcher: RegExp | Constructor<Error> | ErrorPredicate): Promise<void>;
}
export interface StringExpect<T = string> extends ValueExpect<T> {
    /**
     * check if string ends with other string
     * @param start
     * @example endsWith('foo', 'o');
     */
    endWith(end: string): this;
    /**
     * check if string includes substring(s)
     */
    include(...substrings: string[]): this;
    /**
     * check if string includes substring(s)
     */
    contain(...substrings: string[]): this;
    /**
     * check for string to have a certain size
     */
    lengthOf(length: number, message?: string): this;
    /**
     * check if string matches regex
     */
    match(regex: RegExp): this;
    /**
     * check if string starts with other string
     * @param start
     * @example startsWith('foo', 'f');
     */
    startWith(start: string): this;
    /**
     * check if value is a string
     */
    string(): this;
}
export interface SymbolExpect<T> extends ValueExpect<T> {
    /**
     * check if value is a symbol
     */
    symbol(): this;
}

const LooseSymbol: unique symbol = Symbol();

export interface Loose {
    [LooseSymbol]: true;
}

export type AllExpects<T> = ArrayExpect<T> &
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

type GetExpectType<T> = T extends number ? NumberExpect<T> : AllExpects<T>;

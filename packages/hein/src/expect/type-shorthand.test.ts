/* eslint-disable mocha/no-setup-in-describe */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { expect } from '../expect';
import { ValueType } from '../utils/get-type';

const types: Record<ValueType, any> = {
    NaN: Number.NaN,
    array: [],
    bigint: BigInt(5),
    boolean: true,
    function: () => {},
    null: null,
    number: 5,
    object: {},
    string: 'test',
    symbol: Symbol(),
    undefined: undefined
};

describe('expect/type shorthands', () => {
    for (const [method, value] of Object.entries(types)) {
        describe(method, () => {
            const incorrectValue = method === 'string' ? types.object : types.string;
            it(`should not throw if value is a(n) ${ method }`, () => {
                expect(value).to.be.a[method]();
            });
            it(`should throw if value is not a(n) ${ method }`, () => {
                const incorrectType = method === 'string' ? 'object' : 'string';
                const validator = new RegExp(`Expected ${ incorrectType } to be a\\(n\\) ${ method }`);
                expect(() => expect(incorrectValue).to.be.a[method]()).to.throw(validator);
            });
            describe('not', () => {
                it(`should not throw if value is not a(n) ${ method }`, () => {
                    expect(incorrectValue).to.not.be.a[method]();
                });
                it(`should throw if value is a(n) ${ method }`, () => {
                    const validator = new RegExp(`Expected ${ method } to not be a\\(n\\) ${ method }`);
                    expect(() => expect(value).to.not.be.a[method]()).to.throw(validator);
                });
            });
        });
    }
    // Type checks
    expect(Number.NaN).to.be.a.NaN;
    expect([]).to.be.an.array;
    expect(BigInt(5)).to.be.a.bigint;
    expect(true).to.be.a.boolean;
    expect(() => {}).to.be.a.function;
    expect(null).to.be.a.null;
    expect(5).to.be.a.number;
    expect({}).to.be.an.object;
    expect('test').to.be.a.string;
    expect(Symbol()).to.be.a.symbol;
    expect(void 0).to.be.an.undefined;
});

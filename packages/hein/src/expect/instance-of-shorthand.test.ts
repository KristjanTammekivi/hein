/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable mocha/no-setup-in-describe */
import { expect } from '../expect';

const instances = {
    Date: new Date(),
    Map: new Map(),
    Set: new Set(),
    WeakMap: new WeakMap(),
    WeakSet: new WeakSet()
};

describe('expect/instanceOf shorthands', () => {
    for (const [method, instance] of Object.entries(instances)) {
        describe(method, () => {
            // eslint-disable-next-line unicorn/new-for-builtins
            const wrongInstance = new String();

            it(`should not throw if value is an instance of ${ method }`, () => {
                expect(instance).to.be.a[method]();
            });

            it(`should throw if value is not an instance of ${ method }`, () => {
                const regexp = new RegExp(`Expected String to be an instance of ${ method }`);
                expect(() => expect(wrongInstance).to.be.a[method]()).to.throw(regexp);
            });

            describe('not', () => {
                it(`should not throw if value is not an instance of ${ method }`, () => {
                    expect(wrongInstance).to.not.be.a[method]();
                });

                it(`should throw if value is an instance of ${ method }`, () => {
                    const regexp = new RegExp(`Expected ${ method } to not be an instance of ${ method }`);
                    expect(() => expect(instance).to.not.be.a[method]()).to.throw(regexp);
                });
            });
        });
    }
    expect(new Date()).to.be.a.Date;
    expect(new Map()).to.be.a.Map;
    expect(new Set()).to.be.a.Set;
    expect(new WeakMap()).to.be.a.WeakMap;
    expect(new WeakSet()).to.be.a.WeakSet;
});

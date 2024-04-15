/* eslint-disable mocha/no-setup-in-describe */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { expect } from '../expect';

const values = {
    false: false,
    true: true
};

describe('expect/equal shorthands', () => {
    for (const [method, value] of Object.entries(values)) {
        describe(method, () => {
            it(`should not throw if value is ${ method }`, () => {
                expect(value).to.be[method]();
            });

            it(`should throw if value is not ${ method }`, () => {
                const regex = new RegExp(`Expected ${ !value } to be ${ method }`);
                expect(() => expect(!value).to.be[method]()).to.throw(regex);
            });

            describe('not', () => {
                it(`should not throw if value is ${ !value }`, () => {
                    expect(!value).to.not.be[method]();
                });

                it(`should throw if value is ${ value }`, () => {
                    const regex = new RegExp(`Expected ${ value } to not be ${ method }`);
                    expect(() => expect(value).to.not.be[method]()).to.throw(regex);
                });
            });
        });
    }
    expect(false).to.be.false;
    expect(true).to.be.true;
});

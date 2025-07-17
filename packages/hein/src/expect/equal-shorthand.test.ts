import { expect } from '../expect';

const values = {
    false: false,
    true: true
};

describe('expect/equal shorthands', () => {
    // eslint-disable-next-line mocha/no-setup-in-describe
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

    it('shorthands should survive type checks', () => {
        expect(false).to.be.false();
        expect(true).to.be.true();
    });
});

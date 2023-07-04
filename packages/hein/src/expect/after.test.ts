import { expect } from '../expect';

describe('expect/before', () => {
    let earlierDate: Date;
    let laterDate: Date;
    beforeEach(() => {
        earlierDate = new Date(2019, 1, 1);
        laterDate = new Date(2020, 1, 1);
    });
    it('should not throw if date is after expected', () => {
        expect(laterDate).to.be.after(earlierDate);
    });
    it('should throw an error if error is later than expected', () => {
        expect(() => expect(earlierDate).to.after(laterDate)).to.be.throw();
    });
    describe('not', () => {
        it('should not throw if date is after expected', () => {
            expect(earlierDate).to.not.be.after(laterDate);
        });
        it('should throw an error if date is after expected', () => {
            expect(() => expect(laterDate).to.not.be.after(earlierDate)).to.be.throw();
        });
    });
});

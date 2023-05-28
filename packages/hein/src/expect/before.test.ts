import { expect } from '../expect';

describe('expect/before', () => {
    let earlierDate: Date;
    let laterDate: Date;
    beforeEach(() => {
        earlierDate = new Date(2019, 1, 1);
        laterDate = new Date(2020, 1, 1);
    });
    it('should not throw if date is before expected', () => {
        expect(earlierDate).to.be.before(laterDate);
    });
    it('should throw an error if error is later than expected', () => {
        expect(() => expect(laterDate).to.before(earlierDate)).to.be.throw();
    });
    describe('not', () => {
        it('should not throw if date is after expected', () => {
            expect(laterDate).to.not.be.before(earlierDate);
        });
        it('should throw an error if date is before expected', () => {
            expect(() => expect(earlierDate).to.not.be.before(laterDate)).to.be.throw();
        });
    });
});

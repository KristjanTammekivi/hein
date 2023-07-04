import { expect } from '../expect';

describe('expect/between', () => {
    let earlierDate: Date;
    let laterDate: Date;
    let evenLaterDate: Date;
    beforeEach(() => {
        earlierDate = new Date(2019, 1, 1);
        laterDate = new Date(2020, 1, 1);
        evenLaterDate = new Date(2021, 1, 1);
    });
    it('should not throw if date is between expected', () => {
        expect(laterDate).to.be.between(earlierDate, evenLaterDate);
    });
    it('should throw an error if error is later than expected', () => {
        expect(() => expect(earlierDate).to.between(laterDate, evenLaterDate)).to.be.throw();
    });
    it('should work with numbers', () => {
        expect(2).to.be.between(1, 3);
    });
    it('should work exclusively when requested', () => {
        expect(() => expect(2).to.be.between(1, 2, false)).to.be.throw();
    });
    describe('not', () => {
        it('should not throw if date is before expected', () => {
            expect(earlierDate).to.not.be.between(laterDate, evenLaterDate);
        });
        it('should throw an error if date is between expected', () => {
            expect(() => expect(laterDate).to.not.be.between(earlierDate, evenLaterDate)).to.be.throw();
        });
    });
});

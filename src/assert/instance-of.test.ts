import { throws } from '../assert';
import { instanceOf, notInstanceOf } from '../assert';

describe('instanceOf', () => {
    it('should not throw if actual is an instance of the constructor', () => {
        instanceOf(new Date(), Date);
    });
    it('should throw if actual is not an instance of the constructor', () => {
        throws(() => instanceOf(new Error(), Date), /Expected Error to be an instance of Date/);
    });
    it('should throw if actual is not an object', () => {
        throws(() => instanceOf(null, Date), /Expected value to be an object/);
    });
    describe('notInstanceOf', () => {
        it('should not throw if actual is not an instance of the constructor', () => {
            notInstanceOf(new Error(), Date);
        });
        it('should throw if actual is an instance of the constructor', () => {
            throws(() => notInstanceOf(new Date(), Date), /Expected Date to not be an instance of Date/);
        });
    });
});

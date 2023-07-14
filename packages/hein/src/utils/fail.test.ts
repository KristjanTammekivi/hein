import { AssertionError } from 'hein-assertion-utils';
import { expect } from '../expect';
import { fail } from './fail';

describe('fail', () => {
    it('should throw an AssertionError', () => {
        expect(() => fail()).to.throw(AssertionError);
        expect(() => expect.fail()).to.throw(AssertionError);
    });
});

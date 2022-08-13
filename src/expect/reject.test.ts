import { expect } from '../expect';

describe('expect/rejects', () => {
    it('should not reject if promise rejects', async () => {
        await expect(Promise.reject(new Error())).to.reject();
    });
});

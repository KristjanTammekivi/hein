import { rejects } from '../assert';
import { expect } from '../expect';

describe('expect/rejects', () => {
    it('should not reject if promise rejects', async () => {
        const regexp = /Hello darkness my old friend/;
        await expect(Promise.reject(new Error('Hello darkness my old friend'))).to.reject(regexp);
    });

    it(`should reject if error doesn't match the provided regex`, async () => {
        const regexp = /Hello darkness my old friend/;
        await rejects(expect(Promise.reject(new Error(`I've come to talk to you again`))).to.reject(regexp));
    });

    it('should reject if promise resolves', async () => {
        await rejects(expect(Promise.resolve()).to.reject(), /Expected Promise to reject/);
    });

    describe('not', () => {
        it('should not reject if promise resolves', async () => {
            await expect(Promise.resolve()).to.not.reject();
        });

        it('should reject if promise rejects', async () => {
            await rejects(expect(Promise.reject(new Error('Hello darkness my old friend'))).to.not.reject());
        });
    });
});

import { deepHasProperty, deepNotHasProperty, throws } from '../assert';

describe('assert/deepHasProperty', () => {
    it('should not throw if value exists at lodash selector', () => {
        deepHasProperty([{ a: { b: { c: 1 } } }], '[0].a.b.c');
    });

    it('should throw if value does not exist at lodash selector', () => {
        throws(() => {
            deepHasProperty([{ a: { b: { c: 1 } } }], '[0].d');
        }, /Expected \[ { a: { b: { c: 1 } } } ] to have property \[0].d/);
    });

    it('should not throw if key exists and value is the same', () => {
        deepHasProperty([{ a: { b: { c: 1 } } }], '[0].a.b.c', 1);
    });

    it('should throw if key exists in object but value is different', () => {
        throws(() => {
            deepHasProperty([{ a: { b: { c: 1 } } }], '[0].a.b.c', 2);
        }, /Expected \[ { a: { b: { c: 1 } } } ] to have property \[0].a.b.c with value 2/);
    });

    describe('deepNotHasProperty', () => {
        it('should not throw if value does not exist at lodash selector', () => {
            deepNotHasProperty([{ a: { b: { c: 1 } } }], '[0].d');
        });

        it('should throw if value exists at lodash selector', () => {
            throws(() => {
                deepNotHasProperty([{ a: { b: { c: 1 } } }], '[0].a.b.c');
            }, /Expected \[ { a: { b: { c: 1 } } } ] to not have property \[0].a.b.c/);
        });

        it('should throw if key exists in object and value is same', () => {
            throws(() => {
                deepNotHasProperty([{ a: { b: { c: 1 } } }], '[0].a.b.c', 1);
            }, /Expected \[ { a: { b: { c: 1 } } } ] to not have property \[0].a.b.c with value 1/);
        });

        it('should not throw if key exists in object but value is different', () => {
            deepNotHasProperty([{ a: { b: { c: 1 } } }], '[0].a.b.c', 2);
        });
    });
});

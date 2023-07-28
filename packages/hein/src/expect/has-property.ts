import { deepHasProperty, deepNotHasProperty, hasProperty, notHasProperty } from '../assert';
import { use } from '../mixins';

declare module '../expect.types' {
    interface ValueExpect<T> {
        /**
         * check if value has a property
         * @param property a property in the object. When combined with .deep. can be a path like 'a.b.c'
         * @example expect({a: {b: {c: 1}}}).to.have.property('a.b.c');
         * @example expect({a: {b: {c: 1}}}).to.have.deep.property('[0].a.b.c');
         */
        property<K extends keyof T>(property: K): this;
        /**
         * check if value has a property
         * @param property a property in the object. When combined with .deep. can be a path like 'a.b.c'
         * @example expect({a: {b: {c: 1}}}).to.have.property('a.b.c');
         * @example expect({a: {b: {c: 1}}}).to.have.deep.property('[0].a.b.c');
         */
        property(property: string): this;
        /**
         * check if value has a property
         * @param property a property in the object. When combined with .deep. can be a path like 'a.b.c'
         * @param value
         * @example expect({a: {b: {c: 1}}}).to.have.property('a.b.c');
         * @example expect({a: {b: {c: 1}}}).to.have.deep.property('[0].a.b.c');
         */
        property<K extends keyof T>(property: K, value?: any): this;
        /**
         * check if value has a property
         * @param property a property in the object. When combined with .deep. can be a path like 'a.b.c'
         * @param value
         * @example expect({a: {b: {c: 1}}}).to.have.property('a.b.c');
         * @example expect({a: {b: {c: 1}}}).to.have.deep.property('[0].a.b.c');
         */
        property(property: string, value?: any): this;
    }
}

use({
    property: {
        type: 'method',
        value:
            ({ value, inverted, deep }) =>
            (...args: [any, any]) => {
                if (deep) {
                    if (inverted) {
                        return deepNotHasProperty(value, ...args);
                    }
                    return deepHasProperty(value, ...args);
                }
                if (inverted) {
                    return notHasProperty(value, ...args);
                }
                return hasProperty(value, ...args);
            }
    }
});

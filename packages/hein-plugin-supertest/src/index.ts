import type { Method, Property } from 'hein';
import { AssertionError } from 'hein-assertion-utils';

import 'hein/expect.types';

declare module 'hein/expect.types' {
    interface ValueExpect<T> {
        status(status: number): ValueExpect<T>;
        json(): ValueExpect<T>;
        xml(): ValueExpect<T>;
    }
}

const CONTENT_TYPE = {
    JSON: 'application/json',
    XML: 'application/xml'
};

export const supertestPlugin: Record<string, Method | Property> = {
    status: {
        type: 'method',
        value:
            ({ value, inverted }) =>
            (status) => {
                if (inverted) {
                    if (value.status === status) {
                        throw new AssertionError(
                            value.status,
                            status,
                            `Expected status to not be ${ status }, body: ${ JSON.stringify(value.body) }`
                        );
                    }
                } else {
                    if (value.status !== status) {
                        throw new AssertionError(
                            value.status,
                            status,
                            `Expected status ${ status } but got ${ value.status }, body: ${ JSON.stringify(
                                value.body
                            ) }`
                        );
                    }
                }
            }
    },
    json: {
        type: 'method',
        value:
            ({ value, inverted }) =>
            () => {
                if (inverted) {
                    if (value.headers['Content-Type']?.includes(CONTENT_TYPE.JSON)) {
                        throw new AssertionError(
                            value.headers['Content-Type'],
                            CONTENT_TYPE.JSON,
                            `Expected content type to not be application/json, received ${ value.headers['Content-Type'] }`
                        );
                    }
                } else if (!value.headers['Content-Type']?.includes(CONTENT_TYPE.JSON)) {
                    throw new AssertionError(
                        value.headers['Content-Type'],
                        CONTENT_TYPE.JSON,
                        `Expected content type to be application/json, received ${ value.headers['Content-Type'] }`
                    );
                }
            }
    },
    xml: {
        type: 'method',
        value:
            ({ value, inverted }) =>
            () => {
                if (inverted) {
                    if (value.headers['Content-Type']?.includes(CONTENT_TYPE.XML)) {
                        throw new AssertionError(
                            value.headers['Content-Type'],
                            CONTENT_TYPE.XML,
                            `Expected content type to not be application/xml, received ${ value.headers['Content-Type'] }`
                        );
                    }
                } else if (!value.headers['Content-Type']?.includes(CONTENT_TYPE.XML)) {
                    throw new AssertionError(
                        value.headers['Content-Type'],
                        CONTENT_TYPE.XML,
                        `Expected content type to be application/xml, received ${ value.headers['Content-Type'] }`
                    );
                }
            }
    }
};

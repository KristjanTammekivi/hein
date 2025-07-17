import { expect, use } from 'hein';
import { supertestPlugin } from './index';

use(supertestPlugin);

describe('supertestPlugin', () => {
    describe('status', () => {
        it('should pass if status is equal to expected', () => {
            const request = {
                status: 200
            };
            expect(request).to.have.status(200);
        });

        it('should fail if status is not equal to expected', () => {
            const request = {
                status: 500,
                body: 'InternalServerError'
            };
            expect(() => expect(request).to.have.status(200)).to.throw(
                /Expected status 200 but got 500, body: "InternalServerError"/
            );
        });

        describe('not', () => {
            it('should not throw if status is not equal to expected', () => {
                const request = {
                    status: 500,
                    body: 'InternalServerError'
                };
                expect(request).to.not.have.status(200);
            });

            it('should throw if status is equal to expected', () => {
                const request = {
                    status: 200,
                    body: 'OK'
                };
                expect(() => expect(request).to.not.have.status(200)).to.throw(
                    /Expected status to not be 200, body: "OK"/
                );
            });
        });
    });

    describe('json', () => {
        const jsonRequest = {
            headers: {
                'content-type': 'application/json'
            }
        };

        const htmlRequest = {
            headers: {
                'content-type': 'text/html'
            }
        };

        const jsonWithCharsetRequest = {
            headers: {
                'content-type': 'application/json; charset=utf-8'
            }
        };

        it('should pass if content-type is application/json', () => {
            expect(jsonRequest).to.be.json();
        });

        it('should fail if content-type is not application/json', () => {
            expect(() => expect(htmlRequest).to.be.json()).to.throw(
                /Expected content type to be application\/json, received text\/html/
            );
        });

        it(`should not fail if content-type is 'application/json; charset=utf-8'`, () => {
            expect(jsonWithCharsetRequest).to.be.json();
        });

        describe('not', () => {
            it('should pass if content-type is not application/json', () => {
                expect(htmlRequest).to.not.be.json();
            });

            it('should fail if content-type is application/json', () => {
                expect(() => expect(jsonRequest).to.not.be.json()).to.throw(
                    /Expected content type to not be application\/json, received application\/json/
                );
            });

            it(`should fail if content-type is 'application/json; charset=utf-8'`, () => {
                expect(() => expect(jsonWithCharsetRequest).to.not.be.json()).to.throw(
                    /Expected content type to not be application\/json, received application\/json/
                );
            });
        });
    });

    describe('xml', () => {
        const xmlRequest = {
            headers: {
                'content-type': 'application/xml'
            }
        };

        const htmlRequest = {
            headers: {
                'content-type': 'text/html'
            }
        };

        const xmlWithCharsetRequest = {
            headers: {
                'content-type': 'application/xml; charset=utf-8'
            }
        };

        it('should pass if content-type is application/xml', () => {
            expect(xmlRequest).to.be.xml();
        });

        it('should fail if content-type is not application/xml', () => {
            expect(() => expect(htmlRequest).to.be.xml()).to.throw(
                /Expected content type to be application\/xml, received text\/html/
            );
        });

        // eslint-disable-next-line mocha/no-setup-in-describe
        it(`should pass if content-type is ${ xmlWithCharsetRequest.headers['content-type'] }`, () => {
            expect(xmlWithCharsetRequest).to.be.xml();
        });

        describe('not', () => {
            it('should pass if content-type is not application/xml', () => {
                expect(htmlRequest).to.not.be.xml();
            });

            it('should fail if content-type is application/xml', () => {
                expect(() => expect(xmlRequest).to.not.be.xml()).to.throw(
                    /Expected content type to not be application\/xml, received application\/xml/
                );
            });

            // eslint-disable-next-line mocha/no-setup-in-describe
            it(`should fail if content-type is ${ xmlWithCharsetRequest.headers['content-type'] }`, () => {
                expect(() => expect(xmlWithCharsetRequest).to.not.be.xml()).to.throw(
                    /Expected content type to not be application\/xml, received application\/xml/
                );
            });
        });
    });
});

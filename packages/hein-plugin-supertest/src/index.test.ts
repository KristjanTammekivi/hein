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
        it('should pass if Content-Type is application/json', () => {
            const request = {
                headers: {
                    ['Content-Type']: 'application/json'
                }
            };
            expect(request).to.be.json();
        });
        it('should fail if Content-Type is not application/json', () => {
            const request = {
                headers: {
                    ['Content-Type']: 'text/html'
                }
            };
            expect(() => expect(request).to.be.json()).to.throw(
                /Expected content type to be application\/json, received text\/html/
            );
        });
        describe('not', () => {
            it('should pass if Content-Type is not application/json', () => {
                const request = {
                    headers: {
                        ['Content-Type']: 'text/html'
                    }
                };
                expect(request).to.not.be.json();
            });
            it('should fail if Content-Type is application/json', () => {
                const request = {
                    headers: {
                        ['Content-Type']: 'application/json'
                    }
                };
                expect(() => expect(request).to.not.be.json()).to.throw(
                    /Expected content type to not be application\/json, received application\/json/
                );
            });
        });
    });
    describe('xml', () => {
        it('should pass if Content-Type is application/xml', () => {
            const request = {
                headers: {
                    ['Content-Type']: 'application/xml'
                }
            };
            expect(request).to.be.xml();
        });
        it('should fail if Content-Type is not application/xml', () => {
            const request = {
                headers: {
                    ['Content-Type']: 'text/html'
                }
            };
            expect(() => expect(request).to.be.xml()).to.throw(
                /Expected content type to be application\/xml, received text\/html/
            );
        });
        describe('not', () => {
            it('should pass if Content-Type is not application/xml', () => {
                const request = {
                    headers: {
                        ['Content-Type']: 'text/html'
                    }
                };
                expect(request).to.not.be.xml();
            });
            it('should fail if Content-Type is application/xml', () => {
                const request = {
                    headers: {
                        ['Content-Type']: 'application/xml'
                    }
                };
                expect(() => expect(request).to.not.be.xml()).to.throw(
                    /Expected content type to not be application\/xml, received application\/xml/
                );
            });
        });
    });
});

import { expect, use } from 'hein';
import { match, spy } from 'sinon';
import { sinonPlugin } from '.';

use(sinonPlugin);

describe('called', () => {
    it('should not throw if the spy was called', () => {
        const s = spy();
        s();
        expect(s).to.have.been.called();
    });
    it('should throw if spy was not called', () => {
        const s = spy();
        expect(() => expect(s).to.have.been.called()).to.throw();
    });
    it('should throw if callCount is smaller than expected', () => {
        const s = spy();
        s();
        expect(() => expect(s).to.have.been.called(2)).to.throw();
    });
    it('should not throw if callCount is equal to expected', () => {
        const s = spy();
        s();
        s();
        expect(s).to.have.been.called(2);
    });
    describe('not', () => {
        it('should not throw if spy was not called', () => {
            const s = spy();
            expect(s).to.not.have.been.called();
        });
        it('should throw if spy was called', () => {
            const s = spy();
            s();
            expect(() => expect(s).to.not.have.been.called()).to.throw(/Expected spy to not have been called/);
        });
        it('should throw if callCount is equal to expected', () => {
            const s = spy();
            s();
            expect(() => expect(s).to.not.have.been.called(1)).to.throw();
        });
        it('should not throw if callCount is smaller than expected', () => {
            const s = spy();
            s();
            expect(s).to.not.have.been.called(2);
        });
    });
});

describe('calledBefore', () => {
    it('should not throw if called before other spy', () => {
        const s = spy();
        const other = spy();
        s();
        other();
        expect(s).to.have.been.calledBefore(other);
    });
    it('should not throw if other spy was not called', () => {
        const s = spy();
        const other = spy();
        s();
        expect(s).to.have.been.calledBefore(other);
    });
    it('should throw if spy was not called', () => {
        const s = spy();
        const other = spy();
        other();
        expect(() => expect(s).to.have.been.calledBefore(other)).to.throw();
    });
    it('should throw if spy was called after other spy', () => {
        const s = spy();
        const other = spy();
        other();
        s();
        expect(() => expect(s).to.have.been.calledBefore(other)).to.throw();
    });
    describe('not', () => {
        it('should not throw if spy was called after other spy', () => {
            const s = spy();
            const other = spy();
            other();
            s();
            expect(s).to.not.have.been.calledBefore(other);
        });
        it('should throw if spy was called before other spy', () => {
            const s = spy();
            const other = spy();
            s();
            other();
            expect(() => expect(s).to.not.have.been.calledBefore(other)).to.throw();
        });
    });
});

describe('calledAfter', () => {
    it('should not throw if spy was called after other spy', () => {
        const s = spy();
        const other = spy();
        other();
        s();
        expect(s).to.have.been.calledAfter(other);
    });
    it('should throw if other spy was not called', () => {
        const s = spy();
        const other = spy();
        other();
        expect(() => expect(s).to.have.been.calledAfter(other)).to.throw();
    });
    it('should throw if spy was called before other spy', () => {
        const s = spy();
        const other = spy();
        s();
        expect(() => expect(s).to.have.been.calledAfter(other)).to.throw();
    });
    describe('not', () => {
        it('should not throw if spy was called before other spy', () => {
            const s = spy();
            const other = spy();
            s();
            other();
            expect(s).to.not.have.been.calledAfter(other);
        });
        it('should throw if spy was called after other spy', () => {
            const s = spy();
            const other = spy();
            other();
            s();
            expect(() => expect(s).to.not.have.been.calledAfter(other)).to.throw();
        });
    });
});

describe('calledWith', () => {
    it('should throw if spy was not called', () => {
        const s = spy();
        expect(() => expect(s).to.have.been.calledWith(1)).to.throw();
    });
    it('should not throw if spy was called with arg', () => {
        const s = spy();
        s(1);
        expect(s).to.have.been.calledWith(1);
    });
    it('should throw if spy was called with different order args', () => {
        const s = spy();
        s(2, 1);
        expect(() => expect(s).to.have.been.calledWith(1, 2)).to.throw();
    });
    it('should be type safe', () => {
        const fn = (a: number, b: string) => {
            return `${ a }${ b }`;
        };
        const s = spy({ foo: fn });
        s.foo(1, '2');
        expect(s.foo).to.have.been.calledWith(1, '2');
        // @ts-expect-error - should produce error due to wrong type
        expect(s.foo).to.have.been.calledWith('1', 2);
    });
    it('should be type safe with fewer elements', () => {
        const fn = (a: number, b: string) => {
            return `${ a }${ b }`;
        };
        const s = spy({ foo: fn });
        s.foo(1, '2');
        expect(s.foo).to.have.been.calledWith(1);
        // @ts-expect-error - should produce error due to wrong type
        expect(s.foo).to.have.been.calledWith('1');
    });
    it('should work with obscenely large number of arguments', () => {
        const fn = (
            a: number,
            b: string,
            c: boolean,
            d: number,
            // eslint-disable-next-line unicorn/prevent-abbreviations
            e: string,
            f: boolean,
            g: number,
            h: string,
            index: boolean,
            index_: number,
            k: string,
            l: boolean,
            m: number,
            n: string,
            o: boolean,
            p: number,
            q: string,
            r: boolean,
            s: number,
            t: string,
            u: boolean,
            v: number,
            w: string,
            x: boolean,
            y: number,
            z: string
        ) => {
            return z;
        };
        const s = spy({ foo: fn });
        s.foo(
            1,
            '2',
            true,
            4,
            '5',
            false,
            7,
            '8',
            true,
            10,
            '11',
            false,
            13,
            '14',
            true,
            16,
            '17',
            false,
            19,
            '20',
            true,
            22,
            '23',
            false,
            25,
            '26'
        );
        expect(s.foo).to.have.been.calledWith(
            1,
            '2',
            true,
            4,
            '5',
            false,
            7,
            '8',
            true,
            10,
            '11',
            false,
            13,
            '14',
            true,
            16,
            '17',
            false,
            19,
            '20',
            true,
            22,
            '23',
            false,
            25,
            '26'
        );
        expect(s.foo).to.have.been.calledWith(
            // @ts-expect-error - should produce error due to wrong type
            1,
            '2',
            true,
            4,
            '5',
            false,
            7,
            '8',
            true,
            10,
            '11',
            false,
            13,
            '14',
            true,
            16,
            '17',
            false,
            19,
            '20',
            true,
            22,
            '23',
            false,
            25,
            26
        );
    });
    describe('not', () => {
        it('should throw if spy was called with arg', () => {
            const s = spy();
            s(1);
            expect(() => expect(s).to.not.have.been.calledWith(1)).to.throw();
        });
        it('should not throw if spy was not called', () => {
            const s = spy();
            expect(s).to.not.have.been.calledWith(1);
        });
        it('should not throw if spy was called with different order args', () => {
            const s = spy();
            s(2, 1);
            expect(s).to.not.have.been.calledWith(1, 2);
        });
    });
});

describe('calledWithMatch', () => {
    it('should not throw if value matches partially', () => {
        const s = spy();
        s({ a: 1, b: 2, c: 3 });
        expect(s).to.have.been.calledWithMatch({
            a: 1,
            b: match.number
        });
    });
    it(`should throw if value doesn't match`, () => {
        const s = spy();
        s({ a: 1, b: 2 });
        expect(() => {
            expect(s).to.have.been.calledWithMatch({
                a: 1,
                d: 2
            });
        }).to.throw();
    });
    it('should be type safe', () => {
        const fn = ({ a, b }: { a: number; b: string; c: [a: string, b: number, c: boolean] }) => {
            return `${ a }${ b }`;
        };
        const s = spy({ foo: fn });
        s.foo({ a: 1, b: 'b', c: ['c', 1, true] });
        expect(s.foo).to.have.been.calledWithMatch({
            a: 1,
            b: match.string,
            c: [match.number, match.string, match.bool]
        });
        expect(s.foo).to.have.been.calledWithMatch({
            // @ts-expect-error - should produce error due to wrong type
            a: '1',
            b: match.string,
            c: [match.number, match.string, match.bool]
        });
    });
});

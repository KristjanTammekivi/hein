import 'hein/expect.types';

declare module 'hein/expect.types' {
    interface ValueExpect<T> {
        status(status: number): ValueExpect<T>;
        json(): ValueExpect<T>;
        xml(): ValueExpect<T>;
    }
}

export interface State<T> {
    inverted?: boolean;
    value?: T;
    evaluateSize?: boolean;
}

export interface Property {
    type: 'property';
    value: (state: State<any>) => State<any> | null;
}

type MethodCallback = <T>(state: State<T>) => (...args: any[]) => void;

export interface Method {
    type: 'method';
    value: MethodCallback;
}

export interface Alias {
    type: 'alias';
    value: string;
}

export const mixins: Record<string, Property | Method | Alias> = {};

export const use = (plugins: Record<string, Property | Method | Alias>) => {
    Object.assign(mixins, plugins);
};

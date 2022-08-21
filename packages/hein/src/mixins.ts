export interface State<T> {
    inverted?: boolean;
    value?: T;
    evaluateSize?: boolean;
    deep?: boolean;
    partial?: boolean;
}

export interface Property {
    type: 'property';
    value: (state: State<any>) => Partial<State<any>> | null;
}

type MethodCallback = (state: State<any>) => (...args: any[]) => void;

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

export const registerProperty = <T, U extends string, V extends () => any>(obj: T, name: U, value: V) => {
    Object.defineProperty(obj, name, {
        enumerable: true,
        get() {
            return value();
        },
    });
    return obj as T & Record<U, V>;
};

export const registerMethod = <T, U extends string, V>(obj: T, name: U, value: V) => {
    Object.defineProperty(obj, name, {
        value,
    });
    return obj as T & Record<U, V>;
};

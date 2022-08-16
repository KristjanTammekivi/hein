export const registerProperty = <T, U extends string, V extends () => any>(object: T, name: U, value: V) => {
    Object.defineProperty(object, name, {
        enumerable: true,
        get() {
            return value();
        }
    });
    return object as T & Record<U, V>;
};

export const registerMethod = <T, U extends string, V>(object: T, name: U, value: V) => {
    Object.defineProperty(object, name, {
        value
    });
    return object as T & Record<U, V>;
};

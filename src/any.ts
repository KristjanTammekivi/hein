const anySymbol: unique symbol = Symbol();

export const any = () => ({ [anySymbol]: true });

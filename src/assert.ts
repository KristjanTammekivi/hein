export { equal, notEqual } from './assert/equal';
export { throws, notThrows } from './assert/throws';
export { eql, notEql } from './assert/eql';
export { greaterThan, notGreaterThan } from './assert/greater-than';
export { rejects, notRejects } from './assert/rejects';
export { lessThan, notLessThan } from './assert/less-than';
export { isType, notIsType } from './assert/is-type';
export { instanceOf, notInstanceOf } from './assert/instance-of';
export { isEmpty, notIsEmpty } from './assert/is-empty';

export const assert = () => {
    throw new Error('Not implemented');
};

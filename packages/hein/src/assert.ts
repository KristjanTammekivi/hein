export { deepEqual, notDeepEqual } from './assert/deep-equal';
export { equal, notEqual } from './assert/equal';
export { greaterThan, notGreaterThan } from './assert/greater-than';
export { greaterThanEqual, notGreaterThanEqual } from './assert/greater-than-equal';
export { hasProperty, notHasProperty } from './assert/has-property';
export { hasSize, notHasSize } from './assert/has-size';
export { instanceOf, notInstanceOf } from './assert/instance-of';
export { isEmpty, notIsEmpty } from './assert/is-empty';
export { isType, notIsType } from './assert/is-type';
export { lessThan, notLessThan } from './assert/less-than';
export { lessThanEqual, notLessThanEqual } from './assert/less-than-equal';
export { notRejects, rejects } from './assert/rejects';
export { notThrows, throws } from './assert/throws';

export const assert = () => {
    throw new Error('Not implemented');
};

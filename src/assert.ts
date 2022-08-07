export { equal, notEqual } from './assert/equal';
export { throws, notThrows } from './assert/throws';
export { eql, notEql } from './assert/eql';
export { greaterThan, notGreaterThan } from './assert/greater-than';
export { rejects, notRejects } from './assert/rejects';

export const assert = () => {
    throw new Error('Not implemented');
};

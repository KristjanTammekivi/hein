# Hein

[![npm](https://img.shields.io/npm/v/hein?style=flat-square)](https://www.npmjs.com/package/hein)
[![npm](https://img.shields.io/npm/types/hein?style=flat-square)](https://www.npmjs.com/package/hein)
[![npm](https://img.shields.io/npm/dw/hein?style=flat-square)](https://www.npmjs.com/package/hein)
[![npm](https://img.shields.io/github/workflow/status/KristjanTammekivi/hein/Build,%20Lint,%20and%20Test/main?style=flat-square)](https://www.npmjs.com/package/hein)

Assertion library with focus on TypeScript

## Features?

* Full TypeScript support
* Fuzzy matching for eql with hein.any

* [Differences between Chai and Hein](https://github.com/KristjanTammekivi/hein/blob/main/packages/hein/DIFFERENCES_WITH_CHAI.md)

## Plugins

[npm/hein-plugin-sinon](https://www.npmjs.com/package/hein-plugin-sinon) -
Provides assertions like to.have.been.calledOnce() and to.have.been.calledWith() for sinon spies.


## Usage

### Assert
```typescript
import { assert } from 'hein';
import {equal} from 'hein/assert';

equal(1, 1);
assert.equal(1, 1);
```

### Expect
```typescript
import { expect } from 'hein';
expect(1).to.equal(1);
```

#### Chainable properties

* a
* an
* and - used to chain multiple assertions, clears the state (so .not will be reset)
* be
* have
* not - inverts the expectation (ie `expect(5).to.not.equal(5)` will throw)
* to

#### Assertions

##### above

Alias for [greaterThan](#greaterThan)

##### array

Assert that value is an array

```typescript
expect([]).to.be.an.array();
```

##### atLeast

Alias for [greaterThanOrEqual](#greaterThanOrEqual)

##### atMost

Alias for [lessThanOrEqual](#lessThanOrEqual)

##### below

Alias for [lessThan](#lessThan)

##### bigint

Assert that value is a BigInt

```typescript
expect(BigInt(5)).to.be.a.bigint();
```

##### boolean

Assert that value is a boolean

```typescript
expect(true).to.be.a.boolean();
```

##### contain

Alias for [include](#include)

##### Date

Assert that value is an instance of Date

```typescript
expect(new Date).to.be.a.date();
```

##### empty

Assert that array / object / Map / Set is empty
```typescript
expect([]).to.be.empty();
expect({}).to.be.empty();
expect(new Map()).to.be.empty();
expect(new Set()).to.be.empty();
```

##### eql

Assert that value deep equals the expectation. When combined with .partially expected may have missing properties
```typescript
expect({ a: 1 }).to.eql({ a: 1 });
expect({ a: 1, b: new Date()}).to.partially.eql({ a: 1 });

import { any, createEvaluation } from 'hein';
expect({ a: 1, b: new Date(), c: Math.random() }).to.eql({
    a: 1,
    b: any,
    c: createEvaluation(n => typeof n === 'number')
});

```

##### eq

Alias for [equal](#equal)

##### equal

Assert that value strictly equals expectation. NaN is treated as a non-unique value.
Chaining with .deep is an alias for [#eql]
```typescript
expect('hein').to.equal('hein');
expect(NaN).to.equal(NaN);
expect({ a: 1 }).to.deep.equal({ a: 1 })
```

##### false

Assert that value is false
```typescript
expect(false).to.be.false();
```

##### function

Assert that value is a function
```typescript
expect(() => {}).to.be.a.function();
```

##### greaterThan

Assert that value is greater than expectation
```typescript
expect(5).to.be.greaterThan(4);
```

##### gt

Alias for [greaterThan](#greaterThan)

##### greaterThanOrEqual

Assert that value is greater than or equal to argument
```typescript
expect(5).to.be.greaterThanOrEqual(5);
expect(5).to.be.greaterThanOrEqual(4);
```

##### gte

Alias for [greaterThanOrEqual](#greaterThanOrEqual)

##### include

Assert that element / substring is present in array / string
```typescript
expect([1, 2, 3]).to.include(2);
expect('hein').to.include('ei');
```

##### instanceOf

Assert that value is an instance of provided constructor
```typescript
expect(new Error()).to.be.an.instanceOf(Error);
```

##### lengthOf

Assert that value has a length equal to argument
```typescript
expect([1]).to.have.a.lengthOf(1);
expect({ a: 1 }).to.have.a.lengthOf(1);
expect(new Map([['a', 1]])).to.have.a.lengthOf(1);
expect(new Set([1])).to.have.a.lengthOf(1);
expect('hein').to.have.a.lengthOf(4);
```

##### lessThan

Assert that value is less than expectation
```typescript
expect(5).to.be.lessThan(6);
```
##### lt

Alias for [lessThan](#lessThan)

##### lessThanOrEqual

Assert that value is less than or equal to expectation
```typescript
expect(5).to.be.lessThanOrEqual(5);
expect(4).to.be.lessThanOrEqual(5);
```

##### lte

Alias for [lessThanOrEqual](#lessThanOrEqual)

##### Map

Assert that value is an instance of Map
```typescript
expect(new Map()).to.be.a.Map();
```

##### NaN

Assert that value is NaN
```typescript
expect(NaN).to.be.NaN();
```

##### null

Assert that value is null
```typescript
expect(null).to.be.null();
```

##### number

Assert that value is a number
```typescript
expect(5).to.be.a.number();
```

##### object

Assert that value is an object. Null and instances of Array don't count
```typescript
expect({}).to.be.an.object();
```

##### property

Assert that actual has property. Optionally check that propery has value
```typescript
expect({ a: 1 }).to.have.property('a');
expect({ a: 1 }).to.have.property('a', 1);
```

##### reject

Assert that provided Promise rejects. At the moment this is the only assertion that can't be chained, returns a promise
```typescript
await expect(Promise.reject()).to.reject();
```

##### Set

Assert that value is an instance of Set
```typescript
expect(new Set()).to.be.a.Set();
```
##### sizeOf

Alias of [lengthOf](#lengthOf)

##### string

Assert that value is a string
```typescript
expect('hein').to.be.a.string();
```

##### symbol

Assert that value is a symbol
```typescript
expect(Symbol()).to.be.a.symbol();
```

##### throw

Assert that provided function throws
```typescript
expect(() => { throw new Error() }).to.throw();
```
##### true

Assert that value is true
```typescript
expect(true).to.be.true;
```

##### undefined

Assert that value is undefined
```typescript
expect(undefined).to.be.undefined();
```

##### WeakMap

Assert that value is an instance of WeakMap
```typescript
expect(new WeakMap()).to.be.a.WeakMap();
```

##### WeakSet

Assert that value is an instance of WeakSet
```typescript
expect(new WeakSet()).to.be.a.WeakSet();
```

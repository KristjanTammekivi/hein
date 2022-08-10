# Hein

## TODOs

* to.be.undefined()?
* to.be.null()?
* to.have.typeof()?
* .length.to.be.above()?
* .to.have.length(length?)?
* .to.have.property(prop, value?)?
* .to.have.deep.property(lodashSelector, value?)?
* .to.deep?.match()?
* string.to.match(/regex/)?
* (array, string).to.include(element/substring)? / contain
* .to.be.empty()?
* .to.be.approximately(value, delta)?

.and should clear state from last method


## Goals

* Fully type safe, including between expectation and actual
* Built in deep object shape matching
* Deep matching should (at least in some cases) fail if expected array is not the same length as actual
* Example plugin for body, status matching for supertest
* Example plugin for sinon
* Always call assertions like expect(value).to.be.true; instead of throwing on property access
* Eslint plugin to not forget to call expect(value).to.be.true();

## Usage

### Assert style
```typescript
import {equals} from '@hein/hein/assert';

equals(1, 1);
```

## TODO

* Stack hack to get the line number of the assertion

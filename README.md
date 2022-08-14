# Hein

## TODOs

* refactor value shorthands
* instanceof shorthands (Date, Map, Set)

* to.be.typeOf(typeof value) / .to.be.a('date' etc)
* to.be.undefined()?
* to.be.null()?
* .length.to.be.above()?
* .to.have.property(prop, value?)?
* .to.have.deep.property(lodashSelector, value?)?
* .to.deep?.match()?
* string.to.match(/regex/)?
* (array, string).to.include(element/substring)? / contain
* .to.be.approximately(value, delta)?

.and should clear state from last method


* Example plugin for body, status matching for supertest
* Example plugin for sinon
* Eslint plugin to not forget to call expect(value).to.be.true();

## Usage

### Assert style
```typescript
import {equals} from '@hein/hein/assert';

equals(1, 1);
```

## TODO

* Stack hack to get the line number of the assertion

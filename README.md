# Hein

## Goals

* Fully type safe, including between expectation and actual
* Built in deep object shape matching
* Deep matching should (at least in some cases) fail if expected array is not the same length as actual
* Fuzzy matching between dates / date representations somehow
* Example plugin for body, status matching for supertest
* Built in promises
* Built in fuzzy matching
* Always call assertions like expect(value).to.be.true; instead of throwing on property access
* Eslint plugin to not forget to call expect(value).to.be.true();
* Dates assertions, .to.be.after, .to.be.before
* any, expect(a).to.eql({ prop: 1, prop2: any(), prop3: any().optional() })

## Usage

### Assert style
```typescript
import {equals} from '@hein/hein/assert';

equals(1, 1);
```

## TODO

* Stack hack to get the line number of the assertion

# Same, But Different

## Goals

* Fully type safe, including between expectation and actual
* Built in deep object shape matching
* Deep matching should (at least in some cases) fail if expected array is not the same length as actual
* Fuzzy matching between dates / date representations somehow
* Plugin for body, status matching for supertest
* Built in promises
* Built in fuzzy matching
* Always call assertions like expect(value).to.be.true; instead of throwing on property access
* Eslint plugin to not forget to call expect(value).to.be.true();

## Usage

### Assert style
```typescript
import assert from 'same-but-different/assert';

assert.equals(1, 1);

import equals from 'same-but-different/assert/equals';
equals(1, 1);
```

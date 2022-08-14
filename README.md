# Hein

Assertion library with focus on TypeScript

## Features?

* Full TypeScript support
* Fuzzy matching for eql with any()

* [Differences between Chai and Hein](DIFFERENCES_WITH_CHAI.md)

## Usage

### Assert style
```typescript
import { assert } from '@hein/hein';
import {equal} from '@hein/hein/assert';

equal(1, 1);
assert.equal(1, 1);
```

### Expect style
```typescript
import { expect } from '@hein/hein';
expect(1).to.equal(1);
```

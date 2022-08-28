# hein-plugin-sinon

[![npm](https://img.shields.io/npm/v/hein?style=flat-square)](https://www.npmjs.com/package/hein)
[![npm](https://img.shields.io/npm/types/hein?style=flat-square)](https://www.npmjs.com/package/hein)
[![npm](https://img.shields.io/npm/dw/hein?style=flat-square)](https://www.npmjs.com/package/hein)
[![npm](https://img.shields.io/github/workflow/status/KristjanTammekivi/hein/Build,%20Lint,%20and%20Test/main?style=flat-square)](https://www.npmjs.com/package/hein)

Plugin for [hein](https://npmjs.com/package/hein) that adds assertions for sinon.

## Installation

```typescript
import { use } from 'hein';
import { sinonPlugin } from 'hein-plugin-sinon';
use(sinonPlugin);
```

## Usage

### called

Asserts that spy has been called at least once

```typescript
const s = sinon.spy();
s();
expect(s).to.have.been.called();
```

### calledOnce

Asserts that spy has been called exactly once

```typescript
const s = sinon.spy();
s();
expect(s).to.have.been.calledOnce();
```

### calledTwice

Asserts that spy has been called exactly twice

```typescript
const s = sinon.spy();
s(); s();
expect(s).to.have.been.calledTwice();
```

### calledThrice

Asserts that spy has been called exactly three times

```typescript
const s = sinon.spy();
s(); s(); s();
expect(s).to.have.been.calledThrice();
```

### calledTimes

Asserts that spy has been called exactly n times

```typescript
const s = sinon.spy();
s(); s(); s();
expect(s).to.have.been.calledTimes(3);
```

### calledWith

Asserts that spy has been called with the given arguments

```typescript
const s = sinon.spy();
s('a', 'b', 'c');
expect(s).to.have.been.calledWith('a', 'b', 'c');
```

### calledBefore

Asserts that spy has been called before the given spy

```typescript
const s = sinon.spy();
const s2 = sinon.spy();
s();
s2();
expect(s).to.have.been.calledBefore(s2);
```

### calledAfter

Asserts that spy has been called after the given spy

```typescript
const s = sinon.spy();
const s2 = sinon.spy();
s2();
s();
expect(s).to.have.been.calledAfter(s2);
```

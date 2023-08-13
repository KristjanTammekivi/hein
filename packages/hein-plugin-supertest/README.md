# hein-plugin-supertest

[![npm](https://img.shields.io/npm/v/hein?style=flat-square)](https://www.npmjs.com/package/hein)
[![npm](https://img.shields.io/npm/types/hein?style=flat-square)](https://www.npmjs.com/package/hein)
[![npm](https://img.shields.io/npm/dw/hein?style=flat-square)](https://www.npmjs.com/package/hein)
[![npm](https://img.shields.io/github/workflow/status/KristjanTammekivi/hein/Build,%20Lint,%20and%20Test/main?style=flat-square)](https://www.npmjs.com/package/hein)

Plugin for [hein](https://npmjs.com/package/hein) that adds assertions for supertest.

## Installation

```typescript
import { use } from 'hein';
import { supertestPlugin } from 'hein-plugin-supertest';
use(supertestPlugin);
```

## Usage

### status

```typescript
expect(response).to.have.status(200);
```

### json

Check that the response content type is json

```typescript
expect(response).to.be.json();
```

### xml

Check that the response content type is xml

```typescript
expect(response).to.be.xml();
```

# Differences with Chai

## TypeScript

While Chai does have typescript definitions from DefinitelyTyped, the types it provides are a lot looser than I would like.

### Value typechecking

For example, the following is not a typescript violation and the properties of the expectation object are not auto-completed:

```typescript
// Chai:
expect({ a: 1 }).to.eql({ b: 1 }); // No typescript error

// Hein:
expect({ a: 1 }).to.eql({ b: 1 });
/*
Argument of type '{ b: number; }' is not assignable to parameter of type '{ a: number; }'.
  Object literal may only specify known properties, and 'b' does not exist in type '{ a: number; }'.ts(2345)
*/
expect<any>({ a: 1 }).to.eql({ b: 1 }); // OK in case you really want to do this
```

### Method typechecking

```typescript
// Chai:
expect('test').to.be.above(5); // No typescript error

// Hein:
expect('test').to.be.above(5);
/*
Property 'above' does not exist on type 'StringExpect<string>'.ts(2339)
*/
```

## Always call methods, getters are not assertions

With chai there are special properties that act as assertions. In Hein you have to call the method to assert.

```typescript
// Chai:
expect(true).to.be.true;

// Hein:
expect(true).to.be.true();
```

I recommend using [no-unused-expressions eslint rule](https://typescript-eslint.io/rules/no-unused-expressions/) to avoid this.

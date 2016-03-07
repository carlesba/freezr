# Freezr

***(wip) this is an alpha version. Just a proposal***

(Another) Library to build your immutable data structure

## Concerns

There are lots of libraries to build immutable data but most of them avoid the native interface (dotted and bracket notation) so, on one side we're solving immutability problem, but on the other we get new problems:

- **Loose new language features**. As *[destructuring](https://babeljs.io/docs/learn-es2015/#destructuring)*.
- **Worring about arguments interface**. Your application cannot deal 100% with *[put_your_immutable_library]*'s data structure so when that function gets two objects you can't be sure how to read its data.
- **Problems when using other libraries**. You'd like to use that [lodash](https://www.npmjs.com/package/lodash) method or this redux's middleare but you have to transform your immutable-data to plain objects to do it.
- ***Object.freeze* it's not enough**. Although we *freeze* all our data we need to worry every time we create a new object.

## Aproach

- Keep **native interface** for reading data.
- Provide methods to work in an immutable way when the native ones don't.
- All methods will return another immutable object.
- Throw an Error when it has tried to mutate an Immutable Object.

## Examples

```js
import {freezeObject, freezeArray} from 'freezr'

//
// Frozen Objects
//
var obj = {a: 1, b: 2}

var frozenObj = freezeObject(obj) // fozenObj is immutable

frozenObj.a = 3 // throw an exeception because: 'cannot be mutated'
frozenObj.a === 1 // true

//
// Frozen Arrays.
//
var arr = [1, 2, 3]
var frozenArr = freezeArray(arr)
frozenArr[2] === 3 // true
frozenArr[2] = 'new value' // throw an execption: 'cannot be mutated'
frozenArr[2] === 3 // still true

//
// you can still use native methods for arrays
//
var mapped = frozenArr.map((value, index) => {
  return value + 1
}) // [2, 3, 4]

//
// Array methods return frozen elements
//
mapped[0] = 'mutate the array' // throw an execption
mapped[0] === 2 // true


//
// Destructuring
//
var {a} = frozenObj
a === 1 // true

//
// With objects you can: merge, set, delete
//
var merged = frozenObject.merge({a: 2, c: 8})
frozenObject.a === 1 // true
merged.a === 2 // true
merged.c === 8 // true

frozenObject.set('a', 7) // will return another frozen object with ['a'] === 7
frozenObject.delete('a') // will return another frozen object without 'a'

```

## To Do

- Create a deep parser.
- Use lodash methods.
- Remove `Object.freeze` on production with **`NODE_ENV` [convention](https://nodejs.org/docs/latest/api/process.html#process_process_env)**.

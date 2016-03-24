# Freezr

(not another) Library to build your immutable data structure.

## Concerns

There are lots of libraries to build immutable data but most of them avoid the native interface (dotted and bracket notation) so, on one side we're solving immutability problem, but on the other we get new problems:

- **Loose new language features**. Like *[destructuring](https://babeljs.io/docs/learn-es2015/#destructuring)*.
- **Worring about arguments interface**. Your application cannot deal 100% with *[put_your_immutable_library]*'s data structure so when that function gets two objects you can't be sure how to read its data.
- **Problems when using other libraries**. You'd like to use that lodas method or this redux's middleare but you have to transform your immutable-data to plain objects to do it.
- Because** *Object.freeze* it's not enough**. Although we *freeze* all our data we need to do it every time we want to update an object.

## Aproach

- Keep **native interface** for reading data, not for writing.
- Provide methods to work in an immutable way even when the native ones can't (ie: Array.push, delete…).
- All methods will return another immutable object.

## Installation

```
npm install freezr --save-dev
```

## Examples

```js
import {freeze, deepFreeze} from 'freezr'

//
// Frozen Objects
//
var obj = {a: 1, b: 2}

var frozenObj = freeze(obj) // fozenObj is immutable
// Alternatively you could use deepFreeze to parse object deeply

frozenObj.a = 3 // won't change
frozenObj.a === 1 // true

//
// Frozen Arrays.
//
var arr = [1, 2, 3]
var frozenArr = freeze(arr)
frozenArr[2] === 3 // true
frozenArr[2] = 'new value' // won't change
frozenArr[2] === 3 // still true

// And it's still an Array
Array.isArray(frozenArr) // true

//
// you can use native methods for arrays
//
var mapped = frozenArr.map((value, index) => {
  return value + 1
}) // [2, 3, 4]

//
// Array methods return frozen elements
//
mapped[0] = 'mutate the array' // won't change
mapped[0] === 2 // true


//
// Destructuring
//
var {a} = frozenObj
a === 1 // true

//
// With objects you can: merge, set, delete, update
//
var merged = frozenObject.merge({a: 2, c: 8})
frozenObject.a === 1 // true
merged.a === 2 // true
merged.c === 8 // true

frozenObject.set('a', 7) // will return another frozen object with ['a'] === 7
frozenObject.delete('a') // will return another frozen object without 'a'
frozenObject.update('a', (a) => {
  return a + 1
})

// And supports keyPath syntax like ImmutableJS
var nestedObject = {
  a: {
    b: {
      c: 'foo'
    }
  }
}
var nestedFrozen = deepFreeze(nestedObject)
var updatedNested = nestedFrozen.setIn(['a', 'b', 'c'], 'bar')
updatedNested.a.b.c === 'bar' // true
// Or using updater callback
var nestedWithUpdater = nestedFrozen.updateIn(
  ['a', 'b'],
  (bObject) => bObject.set('c', 'newBar')
)
nestedWithUpdater.a.b.c === 'newBar' // true
```

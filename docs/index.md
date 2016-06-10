***(wip)***
# Docs

Freezr offers two methods to freeze objects where the only difference between them is how deep the argument will be frozen:

 - `freeze`: Freezes only first level of the input.
 - `deepFreeze`: Freezes recursively the input.

Regarding the deepness, the interface is exactly the same for both functions.

The **input** can be any type.

The **output** will be same as input in all cases except when:

- Input is a plain `Object`. Then the output will be a `FrozenObject`
- Input is an `Array`. Then the output will be a `FrozenArray`

## FrozenObject

You can work with it as a plain Javascript `Object` but it can't be mutated and adds this methods to do immutability tasks easier:

### methods

### set

```js
set(
  key: String|Number,
  value: any
): FrozenObject
```
Creates a new `FrozenObject` overriding or adding the key/value provided.

#### merge

```js
merge(
  PropsToUpdate: Object
): FrozenObject
```

Useful when you want to update more than value. It works in the same way as `Object.assign` but without mutations. It returns a new object with the new values.

##### Setting non frozen objects

If you pass a nested plain object, deeper attributes won't be frozen. In case you'll need to keep them as frozen you should use `freeze` or `deepFreeze` on the `PropsToUpdate` object passed in the arguments. Example:

```js
var frozenFoo = deepFreeze({
  a: 1,
  b: {
    ba: 1,
    bb: 1
  }
})

// Updating without freezing
var bar = frozenFoo.merge({
  b: { ba: 2 }
})
bar.b.ba = 3
bar.b.ba === 3 // true

// bar has been mutated as Object `b` is not Frozen
// If you want to keep the whole object Frozen you should do:
var frozenBar = frozenFoo.merge(deepFreeze({
  b: { ba: 2 }
})

frozenBar.b.ba = 3
frozenBar.b.ba === 3 // false
```

### delete

```js
delete(
	key: String|Number
): FrozenObject
```
Returns a new FrozenObject without the key passed as argument

### update

Returns a new FrozenObject with the value updated at that key. The new value will be taken from the callback passed as a second argument.

```js
update(
  key: String|Number,
  updater: Function
):FrozenObject

updater(
  valueForKey
): newValueForKey
```
\*Bear in mind that update (as other setters) don't freeze deeply the new values.


### setIn

It works exactly as `set` but using a `PathArray` instead of a normal key.

```js
setIn(
  PathArray: Array,
  value: *
): FrozenObject
```

#### PathArray

A `PathArray` is an Array that tells the path to access a value.

For example:

```js
var foo = deepFreeze({
  a: {
    b: {
      c: 1,
      d: 1
    }
  }
})
var bar = foo.setIn(
  ['a', 'b', 'c'],
  2
)
/*
Now bar will be:
  a: {
    b: {
      c: 2,
      d: 1
    }
  }
*/
```

### updateIn

It works exactly as `update` but using a `PathArray` instead of a normal key.

```js
updateIn(
  PathArray: Array,
  value: *
): FrozenObject
```

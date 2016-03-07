import { createProperty } from './utils'

class FrozenArray {
  constructor(source) {
    const sourceProps = source.reduce(
      (acc, value, index) => {
        acc[index] = createProperty(value)
        return acc
      },
      {}
    )
    Object.defineProperties(this, sourceProps)
    Object.defineProperty(this, '__source__', {
      get: () => source,
      enumberable: false
    })
    Object.freeze(this)
  }
  get length() {
    return this.__source__.length
  }
  get isFrozen() {
    return true
  }
  concat(arr) {
    const output = this.__source__.concat(arr)
    return new FrozenArray(output)
  }
  forEach(callback) {
    return this.__source__.forEach(callback)
  }
  map(callback) {
    return new FrozenArray(this.__source__.map(callback))
  }
  reduce(callback, acc) {
    return this.__source__.reduce(callback, acc)
  }
  filter(callback) {
    return new FrozenArray(this.__source__.filter(callback))
  }
  push() {
    const target = this.__source__.concat([])
    target.push.apply(target, arguments)
    return new FrozenArray(target)
  }
  pop() {
    const target = this.__source__.concat([])
    target.pop()
    return new FrozenArray(target)
  }
  shift() {
    const target = this.__source__.concat([])
    target.shift()
    return new FrozenArray(target)
  }
  unshift() {
    const target = this.__source__.concat([])
    target.unshift.apply(target, arguments)
    return new FrozenArray(target)
  }
  join(separator) {
    return this.__source__.join(separator)
  }
  find(callback, context) {
    return this.__source__.find(callback, context)
  }
  findIndex(callback, context) {
    return this.__source__.findIndex(callback, context)
  }
  indexOf(target) {
    return this.__source__.indexOf(target)
  }
  reverse() {
    const target = this.__source__.concat([])
    target.reverse()
    return new FrozenArray(target)
  }
  insertAt(position, value) {
    const target = this.__source__.concat([])
    target.splice(position, 0, value)
    return new FrozenArray(target)
  }
  deleteAt(position) {
    const target = this.__source__.concat([])
    target.splice(position, 1)
    return new FrozenArray(target)
  }
  update(position, value) {
    const target = this.__source__.concat([])
    target.splice(position, 1, value)
    return new FrozenArray(target)
  }
}

export default FrozenArray

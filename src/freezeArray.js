import freezeObject from './freezeObject'
const FrozenArray = Object.assign([], {
  concat (arr) {
    const output = this.__source__.concat(arr)
    return freezeArray(output)
  },
  forEach (callback) {
    return this.__source__.forEach(callback)
  },
  map (callback) {
    return freezeArray(this.__source__.map(callback))
  },
  reduce (callback, acc) {
    return this.__source__.reduce(callback, acc)
  },
  filter (callback) {
    return freezeArray(this.__source__.filter(callback))
  },
  push () {
    return freezeArray([...this.__source__, ...arguments])
  },
  pop () {
    const target = this.__source__.concat([])
    target.pop()
    return freezeArray(target)
  },
  shift () {
    const target = this.__source__.concat([])
    target.shift()
    return freezeArray(target)
  },
  unshift () {
    const target = this.__source__.concat([])
    target.unshift.apply(target, arguments)
    return freezeArray(target)
  },
  join (separator) {
    return this.__source__.join(separator)
  },
  find (callback, context) {
    return this.__source__.find(callback, context)
  },
  findIndex (callback, context) {
    return this.__source__.findIndex(callback, context)
  },
  indexOf (target) {
    return this.__source__.indexOf(target)
  },
  reverse () {
    const target = this.__source__.concat([])
    target.reverse()
    return freezeArray(target)
  },
  insertAt (position, value) {
    const target = this.__source__.concat([])
    target.splice(position, 0, value)
    return freezeArray(target)
  },
  deleteAt (position) {
    const target = this.__source__.concat([])
    target.splice(position, 1)
    return freezeArray(target)
  },
  set (position, value) {
    const target = this.__source__.concat([])
    target.splice(position, 1, value)
    return freezeArray(target)
  },
  update (position, updater) {
    return this.set(position, updater(this[position]))
  },
  setIn (keyPath, value) {
    const nextIndex = keyPath[0]
    const nextValue = this[nextIndex]
    if (keyPath.length > 1 && nextValue !== undefined && !nextValue.isImmutable) {
      throw new Error('invalid KeyPath: .%s is not a frozen node', nextIndex)
    }
    if (keyPath.length > 1) {
      const setValue = nextValue === undefined
        ? typeof keyPath[1] === 'number' ? freezeArray([]) : freezeObject({})
        : nextValue
      return this.set(
        nextIndex,
        setValue.setIn(keyPath.slice(1), value)
      )
    } else if (keyPath.length === 1) {
      return this.set(nextIndex, value)
    } else {
      return this
    }
  },
  updateIn (keyPath, updater) {
    const nextIndex = keyPath[0]
    const nextValue = this[nextIndex]
    if (keyPath.length > 1 && !nextValue.isImmutable) {
      throw new Error('invalid KeyPath: .%s is not a frozen node', nextIndex)
    }
    if (keyPath.length > 1) {
      return this.set(
        nextIndex,
        nextValue.updateIn(keyPath.slice(1), updater)
      )
    } else if (keyPath.length === 1) {
      return this.update(nextIndex, updater)
    } else {
      return this
    }
  },
  splice () {
    const target = this.__source__.concat([])
    target.splice.apply(target, arguments)
    return freezeArray(target)
  },
  sort (compareFn) {
    const target = this.__source__.concat([])
    target.sort.apply(target, arguments)
    return freezeArray(target)
  },
  toJS () {
    return this.__source__.map((val, index) => {
      return val !== null && val !== undefined && val.isImmutable
        ? val.toJS()
        : val
    })
  },
  isImmutable: true
})

export default function freezeArray (source) {
  if (FrozenArray.isPrototypeOf(source) || source.isImmutable) return source
  let target = source.concat([])
  Object.setPrototypeOf(target, FrozenArray)
  Object.defineProperty(target, '__source__', {
    value: source
  })
  return process.env.NODE_ENV !== 'production'
    ? Object.freeze(target)
    : target
}

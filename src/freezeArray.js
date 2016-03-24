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
    const target = this.__source__.concat([])
    target.push.apply(target, arguments)
    return freezeArray(target)
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
    if (keyPath.length > 1) {
      return this.set(
        nextIndex,
        this[nextIndex].setIn(keyPath.slice(1), value)
      )
    } else if (keyPath.length === 1) {
      return this.set(nextIndex, value)
    } else {
      return this
    }
  },
  updateIn (keyPath, updater) {
    const nextIndex = keyPath[0]
    if (keyPath.length > 1) {
      return this.set(
        nextIndex,
        this[nextIndex].updateIn(keyPath.slice(1), updater)
      )
    } else if (keyPath.length === 1) {
      return this.update(nextIndex, updater)
    } else {
      return this
    }
  }
})

export default function freezeArray (source) {
  var target = source.concat([])
  Object.setPrototypeOf(target, FrozenArray)
  Object.defineProperties(target, {
    '__source__': {
      value: source,
      enumberable: false
    },
    'isImmutable': {
      value: true,
      enumberable: false
    }
  })
  return Object.freeze(target)
}

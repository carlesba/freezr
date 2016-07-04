const FrozenObject = {
  merge () {
    const args = Array.prototype.concat
      .apply([this.__source__], arguments)
    args.unshift({})
    const target = Object.assign.apply(null, args)
    return freezeObject(target)
  },
  delete (key) {
    const target = Object.assign({}, this.__source__)
    delete target[key]
    return freezeObject(target)
  },
  set (key, value) {
    let update = {}
    update[key] = value
    const target = Object.assign({}, this.__source__, update)
    return freezeObject(target)
  },
  update (key, updater) {
    return this.set(key, updater(this[key]))
  },
  setIn (keyPath, value) {
    const nextKey = keyPath[0]
    const nextValue = this[nextKey]
    if (keyPath.length > 1 && nextValue !== undefined && !nextValue.isImmutable) {
      throw new Error('invalid KeyPath: .%s is not a frozen node', nextKey)
    }
    if (keyPath.length > 1) {
      const setValue = nextValue === undefined
        ? freezeObject({})
        : nextValue
      return this.set(
        nextKey,
        setValue.setIn(keyPath.slice(1), value)
      )
    } else if (keyPath.length === 1) {
      return this.set(nextKey, value)
    } else {
      return this
    }
  },
  updateIn (keyPath, updater) {
    const nextKey = keyPath[0]
    const nextValue = this[nextKey]
    if (keyPath.length > 1 && !nextValue.isImmutable) {
      throw new Error('invalid KeyPath: .%s is not a frozen node', nextKey)
    }
    if (keyPath.length > 1) {
      return this.set(
        nextKey,
        nextValue.updateIn(keyPath.slice(1), updater)
      )
    } else if (keyPath.length === 1) {
      return this.set(nextKey, updater(nextValue))
    } else {
      return this
    }
  },
  toJS () {
    return Object.keys(this.__source__).reduce(
      (acc, key) => {
        if (acc[key].isImmutable) acc[key] = acc[key].toJS()
        return acc
      },
      this.__source__
    )
  },
  isImmutable: true
}

export default function freezeObject (source) {
  if (FrozenObject.isPrototypeOf(source)) return source
  const target = Object.create(FrozenObject)
  Object.defineProperty(target, '__source__', {
    value: source
  })
  Object.assign(target, source)
  return Object.freeze(target)
}

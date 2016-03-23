class FrozenObject {
  constructor (source) {
    Object.assign(this, source)
    Object.defineProperty(this, '__source__', {
      value: source,
      enumberable: false
    })
    Object.freeze(this)
  }
  get isFrozen () {
    return true
  }
  merge () {
    const args = Array.prototype.concat
      .apply([this.__source__], arguments)
    args.unshift({})
    const target = Object.assign.apply(null, args)
    return new FrozenObject(target)
  }
  delete (key) {
    const target = Object.assign({}, this.__source__)
    delete target[key]
    return new FrozenObject(target)
  }
  set (key, value) {
    let update = {}
    update[key] = value
    const target = Object.assign({}, this.__source__, update)
    return new FrozenObject(target)
  }
  update (key, updater) {
    return this.set(key, updater(this[key]))
  }
  setIn (keyPath, value) {
    const nextKey = keyPath[0]
    if (keyPath.length > 1) {
      return this.set(
        nextKey,
        this[nextKey].setIn(keyPath.slice(1), value)
      )
    } else if (keyPath.length === 1) {
      return this.set(nextKey, value)
    } else {
      return this
    }
  }
  updateIn (keyPath, updater) {
    const nextKey = keyPath[0]
    if (keyPath.length > 1) {
      return this.set(
        nextKey,
        this[nextKey].updateIn(keyPath.slice(1), updater)
      )
    } else if (keyPath.length === 1) {
      return this.set(nextKey, updater(this[nextKey]))
    } else {
      return this
    }
  }
}

export default FrozenObject

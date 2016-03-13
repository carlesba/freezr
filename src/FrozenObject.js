import createProperty from './createProperty'

class FrozenObject {
  constructor (source) {
    const properties = Object.keys(source).reduce(
      (acc, key) => {
        acc[key] = createProperty(source[key])
        return acc
      },
      {}
    )
    Object.defineProperties(this, properties)
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
}
export default FrozenObject

import FrozenObject from './FrozenObject'
import FrozenArray from './FrozenArray'

const isPlainObj = (value) => {
  return value && (value.constructor === Object || value.constructor === undefined)
}

export const deepFreeze = (source) => {
  return recursiveFreeze(source)
}

export const freeze = (source) => {
  if (isPlainObj(source)) {
    return new FrozenObject(source)
  } else if (Array.isArray(source)) {
    return new FrozenArray(source)
  } else {
    return source
  }
}

const recursiveFreeze = (source, key) => {
  let o = {}
  if (isPlainObj(source)) {
    Object.assign(o, keyIterator(source, (value, key) => recursiveFreeze(value, key)))
  } else {
    o[key] = source
  }

  if (Array.isArray(source)) {
    return source.map(value => recursiveFreeze(value))
  }

  return freeze(o)
}

const keyIterator = (obj, fn) => {
  return Object.keys(obj).reduce((acc, key) => {
    acc[key] = fn(obj[key], key)
    return acc
  }, {})
}

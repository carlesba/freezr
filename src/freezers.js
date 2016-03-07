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

const recursiveObject = (source, key) => {
  let o = {}
  Object.assign(o, keyIterator(source, (value, key) => recursiveFreeze(value, key)))
  if (!isPlainObj(source)) o[key] = source
  return freeze(o)
}

const recursiveFreeze = (source) => {
  if (isPlainObj(source)) {
    return recursiveObject(source)
  }

  if (Array.isArray(source)) {
    return freeze(source.map(value => recursiveFreeze(value)))
  }

  return source
}

const keyIterator = (obj, fn) => {
  return Object.keys(obj).reduce((acc, key) => {
    acc[key] = fn(obj[key], key)
    return acc
  }, {})
}

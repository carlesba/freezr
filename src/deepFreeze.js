import freeze from './freeze'
import {isPlainObj} from './utils'

export default function deepFreeze (source) {
  return freeze(recursiveFreeze(source))
}

const recursiveFreeze = (source) => {
  if (isPlainObj(source)) {
    return keyIterator(source, (v) => deepFreeze(v))
  } else if (Array.isArray(source)) {
    return source.map((v) => deepFreeze(v))
  } else {
    return source
  }
}

const keyIterator = (obj, fn) => {
  return Object.keys(obj).reduce((acc, key) => {
    acc[key] = fn(obj[key], key)
    return acc
  }, {})
}

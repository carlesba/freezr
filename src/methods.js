import {
  removeLast,
  checkFrozen
} from './methods-utils'
import {freeze as f} from './creation'
import {doNew} from './creation-utils'

/*
  methods
 */

export function getIn (path, o, onlyFrozen) {
  const oo = o || this
  return path.reduce((value, key) =>
    value === undefined || value === null
      ? value
      : onlyFrozen
        ? checkFrozen(value[key]) ? value[key] : undefined
        : value[key]
  , oo)
}

export const checkPath = (keyPath, method, o) => {
  const oo = o || this
  const path2check = removeLast(keyPath)
  if (!oo.__isFreezr__ || getIn(path2check, oo, true) === undefined) {
    const errorMsg = `Invalid keyPath ${keyPath}, ${method}`
    throw new Error(errorMsg)
  }
  return true
}

export function set (key, value, o) {
  const oo = o || this
  if (key === undefined || key === null) return oo
  return f(Object.assign({}, oo, {[key]: value}))
}

export function setIn (keyPath, value, o) {
  const oo = f(o) || this
  checkPath(keyPath, 'setIn', oo)
  if (keyPath.length <= 1) return set(keyPath[0], value, oo)
  return doNew(keyPath).reverse()
    .reduce((partial, key, index) => {
      const partialPath = removeLast(keyPath, index + 1)
      return getIn(partialPath, oo).set(key, partial)
    }, value)
}

export function update (key, callback, o) {
  const oo = o || this
  return set(key, callback(oo[key]), oo)
}

export function updateIn (keyPath, callback, o) {
  const oo = o || this
  checkPath(keyPath, 'updateIn', oo)
  return setIn(
    keyPath,
    callback(getIn(keyPath, oo)),
    oo
  )
}

export function merge () {
  const ref = Array.isArray(this) ? [] : {}
  const args = Object.assign.apply(ref, arguments)
  const o = doNew(this)
  const oo = Object.assign({}, o, args)
  return f(oo)
}

export function remove (key, o) {
  const oo = doNew(o || this)
  if (Array.isArray(oo)) return f(oo).deleteAt(key)
  delete oo[key]
  return f(oo)
}

// export function createIn (keyPath, value, o) {
//   const oo = doNew(keyPath)
//     .reduce((acc, key, index) => {
//       keyPath.slice(1).length === 1
//         ? set(key, value, acc)
//         : acc[key]
//     },
//       o
//     )
//   return f(oo)
// }

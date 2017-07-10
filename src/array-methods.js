import { freeze as f } from './creation'
import { doNew } from './creation-utils'

/*
  Array Methods
 */
export function forEach (callback, a) {
  return f(doNew(a || this).forEach(callback))
}
export function map (callback, a) {
  return f(doNew(a || this).map(callback))
}
export function filter (callback, a) {
  return f(doNew(a || this).filter(callback))
}
export function reduce (callback, init, a) {
  return f(doNew(a || this).reduce(callback, init))
}
export function push (value, a) {
  const rawArray = doNew(a || this)
  rawArray.push(value)
  return f(rawArray)
}
export function pop (value, a) {
  const rawArray = doNew(a || this)
  rawArray.pop(value)
  return f(rawArray)
}
export function shift (value, a) {
  const rawArray = doNew(a || this)
  rawArray.shift(value)
  return f(rawArray)
}
export function unshift (value, a) {
  const rawArray = doNew(a || this)
  rawArray.unshift(value)
  return f(rawArray)
}
export function first (a) {
  return (a || this)[0]
}
export function last (a) {
  const aa = a || this
  return aa[aa.length - 1]
}
// it can only be used as method
export function splice () {
  const rawArray = doNew(this)
  rawArray.splice.apply(rawArray, arguments)
  return f(rawArray)
}
export function insertAt (position, value, a) {
  return f(a || this).splice(position, 0, value)
}
export function deleteAt (position, a) {
  return f(a || this).splice(position, 1)
}
export function sort (comparator, a) {
  const rawArray = doNew(a || this)
  rawArray.sort(comparator)
  return f(rawArray)
}
export function reverse (a) {
  const rawArray = doNew(a || this)
  rawArray.reverse()
  return f(rawArray)
}
export function join (separator, a) {
  const rawArray = doNew(a || this)
  return rawArray.join(separator)
}
// it can only be used as method
export function concat () {
  const rawArray = doNew(this)
  return f(rawArray.concat.apply(rawArray, arguments))
}
export function slice (begin, end, a) {
  const rawArray = doNew(a || this)
  return f(rawArray.slice(begin, end))
}
export function indexOf (value, a) {
  const aa = doNew(a || this)
  return aa.indexOf(value)
}
export function findIndex (callback, a) {
  const aa = doNew(a || this)
  return aa.findIndex(callback)
}
export function includes (callback, fromIndex, a) {
  const aa = typeof fromIndex === 'number' ? a : fromIndex
  const fromI = typeof fromIndex === 'number' && fromIndex
  const aaa = doNew(aa || this)
  return aaa.includes(callback, fromI)
}

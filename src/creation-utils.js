import * as freezeProto from './methods'
import * as arrayMethods from './array-methods'

freezeProto.delete = freezeProto.remove

/*
  Creation Utils
 */

const freezeArrayProto = Object.assign({}, freezeProto, arrayMethods)

export const getFreezeProto = (o) => Array.isArray(o) ? freezeArrayProto : freezeProto

export const doNew = (o) => {
  if (o.__isFreezr__ && Array.isArray(o)) {
    const oo = []
    for (let i = 0; i < o.length; i++) {
      oo.push(o[i])
    }
    return oo
  }
  return Array.isArray(o)
  ? o.slice()
  : Object.assign({}, o)
}

export const isFreezable = (o) => (
  typeof o === 'object' &&
  o !== null
)

export const isPlainObj = (value) =>
  value && (value.constructor === Object || value.constructor === undefined)

export const mapObject = (callback, o) => Object.keys(o)
  .reduce((acc, key, index) => {
    acc[key] = callback(o[key], index, o)
    return acc
  }, {})

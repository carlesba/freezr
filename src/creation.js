import {
  doNew,
  getFreezeProto,
  isFreezable,
  mapObject
} from './creation-utils'

/*
  Creation
 */
export function freeze (o, oo) {
  if (!isFreezable(o)) return o
  const ooo = doNew(o)
  Object.setPrototypeOf(ooo, getFreezeProto(o))
  Object.defineProperties(ooo, {
    'toJSON': {
      writable: false,
      enumerable: false,
      configurable: false,
      value: () => ooo.toJS()
    },
    '__isFreezr__': {
      writable: false,
      enumerable: false,
      configurable: false,
      value: true
    }
  })
  return process.env.NODE_ENV !== 'production'
    ? Object.freeze(ooo)
    : ooo
}

export function deepFreeze (o, origin) {
  if (!isFreezable(o)) return o
  const oo = Array.isArray(o)
    ? o.map((a) => deepFreeze(a))
    : mapObject((a) => deepFreeze(a), o)

  return freeze(oo, o)
}

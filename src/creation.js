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
  const proto = Object.assign(getFreezeProto(o), {
    __isFreezr__: true
  })
  const ooo = doNew(o)
  Object.setPrototypeOf(ooo, proto)
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

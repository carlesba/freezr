/*
  methods utils
 */

const isFreezable = (o) => (
  typeof o === 'object' &&
  o !== null
)

export const removeLast = (a, number = 1) => number > 1
  ? removeLast(a.slice(0, -1), number - 1)
  : a.slice(0, -1)

export const removeFirst = (a, number = 1) => number > 1
  ? removeFirst(a.slice(1), number - 1)
  : a.slice(1)

export const getLast = (a) => a.slice(-1)[0]

/*
  Array Methods Utils
 */
export const createMethodForEachKey = (keys, callback) => keys.reduce(
  (oo, key) => {
    oo[key] = callback(key)
    return oo
  }, {}
)

export const checkFrozen = (o) => (
  !isFreezable(o) ||
  (
    typeof o === 'object' &&
    typeof o.toJS === 'function' &&
    typeof o.getIn === 'function'
  )
)

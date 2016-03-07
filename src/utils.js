export const createProperty = (value) => {
  return {
    enumerable: true,
    get: () => value,
    set: () => {
      throw new Error('Cannot be mutated')
    }
  }
}

export function isPlainObj (value) {
  return value && (value.constructor === Object || value.constructor === undefined)
}

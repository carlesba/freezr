export const createProperty = (value) => {
  return {
    enumerable: true,
    get: () => value,
    set: () => {
      throw new Error('Cannot be mutated')
    }
  }
}

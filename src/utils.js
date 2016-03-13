export const isPlainObj = (value) => {
  return value && (value.constructor === Object || value.constructor === undefined)
}

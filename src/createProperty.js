const createProperty = (value) => {
  return {
    enumerable: true,
    value: value,
    writable: false
  }
}

export default createProperty

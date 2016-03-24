import freezeObject from './freezeObject'
import freezeArray from './freezeArray'
import {isPlainObj} from './utils'
/*
  Create instances usint the constructors
*/
export default function freeze (source) {
  if (isPlainObj(source)) {
    return freezeObject(source)
  } else if (Array.isArray(source)) {
    return freezeArray(source)
  } else {
    return source
  }
}

import FrozenObject from './FrozenObject'
import FrozenArray from './FrozenArray'
import {isPlainObj} from './utils'
/*
  Create instances usint the constructors
*/
export default function freeze (source) {
  if (isPlainObj(source)) {
    return new FrozenObject(source)
  } else if (Array.isArray(source)) {
    return new FrozenArray(source)
  } else {
    return source
  }
}


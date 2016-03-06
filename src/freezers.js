import FrozenObject from './FrozenObject'
import FrozenArray from './FrozenArray'
/*
  Create instances usint the constructors
*/
export const freezeObject = (o) => new FrozenObject(o)
export const freezeArray = (a) => new FrozenArray(a)

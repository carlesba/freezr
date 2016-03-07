import expect from 'expect'
import { freeze } from '../src/freezers'

export const createMockObject = () => {
  return {
    a: 1,
    b: 2,
    c: () => 3
  }
}

export const buildMockObjectFrozen = (source = createMockObject()) => {
  return {
    source,
    frozen: freeze(source)
  }
}

export const expectToBeImmutableAndThrowError = (target) => {
  const firstKey = Object.keys(target)[0]
  const firstValue = target[firstKey]
  expect(() => {
    target[firstKey] = firstValue + 1
  }).toThrow()
  expect(target[firstKey]).toBe(firstValue)
}

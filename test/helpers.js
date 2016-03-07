import expect from 'expect'
import { freezr } from '../src'

export const createMockArray = () => {
  return [
    1,
    2,
    () => 3,
    true,
    {a: 1}
  ]
}

export const createMockObject = () => {
  return {
    a: 1,
    b: 2,
    c: () => 3
  }
}

export const buildMockArrayFrozen = (source = createMockArray()) => {
  return {
    source,
    frozen: freezr(source)
  }
}

export const buildMockObjectFrozen = (source = createMockObject()) => {
  return {
    source,
    frozen: freezr(source)
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

export const expectToExecuteMethodPerItem = (methodName) => {
  const {frozen} = buildMockArrayFrozen()
  var times = 0
  frozen[methodName](() => { times += 1 })
  expect(times).toBe(frozen.length)
}

export const expectToPassValueIndexToCallback = (methodName) => {
  const {frozen} = buildMockArrayFrozen()
  frozen[methodName]((value, index) => {
    expect(value).toBe(frozen[index])
  })
}

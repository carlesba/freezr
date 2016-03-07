import expect from 'expect'
import { freeze, deepFreeze } from '../src/freezers'

export const expectToBeImmutableAndThrowError = (target) => {
  const firstKey = Object.keys(target)[0]
  const firstValue = target[firstKey]
  expect(() => {
    target[firstKey] = firstValue + 1
  }).toThrow()
  expect(target[firstKey]).toBe(firstValue)
}

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

export const createMockNestedObject = () => {
  return {
    first: {
      property: 'david'
    },
    second: 'carlesba',
    third: {
      third_first: {
        property: 'nestedObject'
      },
      third_scond: {
        property: 3
      }
    }
  }
}

export const createMockNestedArray = () => {
  return [
    {
      lola: {
        name: 'david'
      },
      name: 'carlesba'
    },
    2,
    () => 3,
    'freezing'
  ]
}

export const mockFrozenBuilder = (method, source) => {
  return {
    frozen: method(source),
    source
  }
}

export const buildMockObjectFrozen = () => mockFrozenBuilder(freeze, createMockObject())
export const buildMockArrayFrozen = () => mockFrozenBuilder(freeze, createMockArray())
export const buildMockObjectDeepFrozen = () => mockFrozenBuilder(deepFreeze, createMockNestedObject())
export const buildMockArrayDeepFrozen = () => mockFrozenBuilder(deepFreeze, createMockNestedArray())

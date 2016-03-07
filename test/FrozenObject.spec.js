import expect from 'expect'
import FrozenObject from '../src/FrozenObject'

import {
  buildMockObjectFrozen,
  expectToBeImmutableAndThrowError
} from './helpers'

describe('FrozenObject', () => {
  describe(':constructor', () => {
    it('returns an object with all the props from the source', () => {
      const {source, frozen} = buildMockObjectFrozen()
      Object.keys(source).forEach((key) => {
        expect(source[key]).toBe(frozen[key])
      })
    })
    it('throw an error when try to mutate a property', () => {
      const {frozen} = buildMockObjectFrozen()
      expect(() => {
        frozen.a = 2
      }).toThrow()
    })
  })

  describe('.merge', () => {
    it('returns a new FrozenObject with the extended values', () => {
      const mock = {a: 1, b: 2, c: 3}
      const extension = {a: 'a', b: 'b', d: 'd'}
      const extension2 = {a: false, e: true}
      const frozen = new FrozenObject(mock)
      const native = Object.assign({}, mock, extension, extension2)
      const target = frozen.merge(extension, extension2)
      Object.keys(native).forEach((key) => {
        expect(target[key]).toBe(native[key])
      })
      expectToBeImmutableAndThrowError(target)
    })
  })

  describe('.set', () => {
    it('returns a new FrozenObject with a new value for the specified key', () => {
      const {frozen} = buildMockObjectFrozen()
      const aValue = frozen.a
      const target = frozen.set('a', aValue + 1)
      expect(target.a).toBe(aValue + 1)
      Object.keys(frozen).forEach((key) => {
        if (key === 'a') {
          expect(target[key]).toBe(aValue + 1)
        } else {
          expect(target[key]).toBe(frozen[key])
        }
      })
      expectToBeImmutableAndThrowError(target)
    })
  })

  describe('.delete', () => {
    it('returns a new FrozenObject without the specified key', () => {
      const {frozen} = buildMockObjectFrozen()
      const deletedKey = 'a'
      const target = frozen.delete(deletedKey)
      Object.keys(target).forEach((key) => {
        if (key === deletedKey) {
          expect(target[key]).toBe(undefined)
        } else {
          expect(target[key]).toBe(frozen[key])
        }
      })
      expectToBeImmutableAndThrowError(target)
    })
  })
})

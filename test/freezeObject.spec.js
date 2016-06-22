/* eslint-env mocha */
import expect, {createSpy} from 'expect'
import freezeObject from '../src/freezeObject'
import deepFreeze from '../src/deepFreeze'

const createMockObject = () => {
  return {
    a: Symbol(1),
    b: Symbol(2),
    c: () => 3,
    d: {
      e: 5,
      f: 'foo'
    }
  }
}

const buildMockFrozen = (source = createMockObject()) => {
  return {
    source,
    frozen: freezeObject(source)
  }
}

const expectToBeImmutable = (target) => {
  const firstKey = Object.keys(target)[0]
  const firstValue = target[firstKey]
  expect(() => {
    target[firstKey] = Symbol('new value')
  }).toThrow()
  expect(target[firstKey]).toBe(firstValue)
}

describe('freezeObject', () => {
  describe(':constructor', () => {
    it('returns an object with all the props from the source', () => {
      const {source, frozen} = buildMockFrozen()
      Object.keys(source).forEach((key) => {
        expect(source[key]).toBe(frozen[key])
      })
    })
    it('returns an immutable object', () => {
      const {frozen} = buildMockFrozen()
      expectToBeImmutable(frozen)
    })
    it('returns an object with the same iterable keys', () => {
      const {source, frozen} = buildMockFrozen()
      const sourceKeys = Object.keys(source)
      const frozenKeys = Object.keys(frozen)
      expect(frozenKeys).toEqual(sourceKeys)
    })
  })

  describe('.merge', () => {
    it('returns a frozen object with the extended values', () => {
      const mock = {a: 1, b: 2, c: 3}
      const extension = {a: 'a', b: 'b', d: 'd'}
      const extension2 = {a: false, e: true}
      const frozen = freezeObject(mock)
      const native = Object.assign({}, mock, extension, extension2)
      const target = frozen.merge(extension, extension2)
      Object.keys(native).forEach((key) => {
        expect(target[key]).toBe(native[key])
      })
      expectToBeImmutable(target)
    })
  })

  describe('.set', () => {
    it('returns a frozen object with a new value for the specified key', () => {
      const {frozen} = buildMockFrozen()
      const oldValue = frozen.a
      const newValue = Symbol('new value')
      const target = frozen.set('a', newValue)
      Object.keys(frozen).forEach((key) => {
        if (key === 'a') {
          expect(frozen[key]).toBe(oldValue)
          expect(target[key]).toBe(newValue)
        } else {
          expect(target[key]).toBe(frozen[key])
        }
      })
      expectToBeImmutable(target)
    })
  })

  describe('.update', () => {
    it('returns a frozen object with the value passed by the updater', () => {
      const {frozen} = buildMockFrozen()
      const newValue = {foo: 'newValue'}
      const updater = () => newValue
      const target = frozen.update('d', updater)
      expect(target.d).toBe(newValue)
    })
    it('executes the updater callback with the object pointed by the key', () => {
      const {frozen} = buildMockFrozen()
      const updater = createSpy()
      frozen.update('d', updater)
      expect(updater).toHaveBeenCalledWith(frozen.d)
    })
  })

  describe('.delete', () => {
    it('returns a frozen object without the specified key', () => {
      const {frozen} = buildMockFrozen()
      const deletedKey = 'a'
      const target = frozen.delete(deletedKey)
      Object.keys(target).forEach((key) => {
        if (key === deletedKey) {
          expect(target[key]).toBe(undefined)
        } else {
          expect(target[key]).toBe(frozen[key])
        }
      })
      expectToBeImmutable(target)
    })
  })
  describe('.setIn', () => {
    it('returns a frozen object with the deep value updated', () => {
      const input = createMockObject()
      const frozen = deepFreeze(input)
      const newValue = 'newValue'
      const target = frozen.setIn(['d', 'e'], newValue)
      expect(target.d.e).toBe(newValue)
    })
    it('returns a frozen object for each level where a value has change', () => {
      const input = createMockObject()
      const frozen = deepFreeze(input)
      const newValue = 'newValue'
      const target = frozen.setIn(['d', 'e'], newValue)
      expect(target).toNotBe(frozen)
      expect(target.d).toNotBe(frozen.d)
      expect(target.d.e).toNotBe(frozen.d.e)
    })
  })
  describe('.updateIn', () => {
    it('passes the object to update as an argument for the passed callback', () => {
      const input = createMockObject()
      const frozen = deepFreeze(input)
      const updater = createSpy()
      frozen.updateIn(['d'], updater)
      expect(updater).toHaveBeenCalledWith(frozen.d)
    })
    it('updates the object with the value provided by the callback', () => {
      const input = createMockObject()
      const frozen = deepFreeze(input)
      const newValue = {foo: 'newValue'}
      const updater = () => newValue
      const target = frozen.updateIn(['d'], updater)
      expect(target.d).toBe(newValue)
    })
  })
  describe('.toJS', () => {
    it('returns mutable source object', () => {
      const {source, frozen} = buildMockFrozen()
      expect(frozen.toJS()).toBe(source)
    })
  })
})

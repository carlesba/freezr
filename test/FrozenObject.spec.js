import expect, {createSpy} from 'expect'
import FrozenObject from '../src/FrozenObject'
import deepFreeze from '../src/deepFreeze'

const createMockObject = () => {
  return {
    a: 1,
    b: 2,
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
    frozen: new FrozenObject(source)
  }
}

const expectToBeImmutable = (target) => {
  const firstKey = Object.keys(target)[0]
  const firstValue = target[firstKey]
  expect(() => {
    target[firstKey] = 'asdfasdf'
  }).toThrow()
  expect(target[firstKey]).toBe(firstValue)
}

describe('FrozenObject', () => {
  describe(':constructor', () => {
    it('returns an object with all the props from the source', () => {
      const {source, frozen} = buildMockFrozen()
      Object.keys(source).forEach((key) => {
        expect(source[key]).toBe(frozen[key])
      })
    })
    it('throw an error when try to mutate a property', () => {
      const {frozen} = buildMockFrozen()
      expectToBeImmutable(frozen)
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
      expectToBeImmutable(target)
    })
  })

  describe('.set', () => {
    it('returns a new FrozenObject with a new value for the specified key', () => {
      const {frozen} = buildMockFrozen()
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
      expectToBeImmutable(target)
    })
  })

  describe('.update', () => {
    it('returns a new FrozenObject with the value passed by the updater', () => {
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
    it('returns a new FrozenObject without the specified key', () => {
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
    it('returns a new FrozenObject with the deep value updated', () => {
      const input = createMockObject()
      const frozen = deepFreeze(input)
      const newValue = 'newValue'
      const target = frozen.setIn(['d', 'e'], newValue)
      expect(target.d.e).toBe(newValue)
    })
    it('returns a new FrozenObject for each level where a value has change', () => {
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
})

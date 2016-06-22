/* eslint-env mocha */
import expect, {createSpy} from 'expect'
import freezeArray from '../src/freezeArray'
import deepFreeze from '../src/deepFreeze'
/*
  UTILS
 */
const createMockArray = () => {
  return [
    Symbol(1),
    Symbol(2),
    () => 3,
    true,
    {a: [1, 2]}
  ]
}
const buildMockFrozen = (source = createMockArray()) => {
  return {
    source,
    frozen: freezeArray(source)
  }
}
const buildMockDeepFrozen = (source = createMockArray()) => {
  return {
    source,
    frozen: deepFreeze(source)
  }
}
const expectToBeImmutable = (target) => {
  const firstValue = target[0]
  expect(() => {
    target[0] = 123123
  }).toThrow()
  expect(target[0]).toBe(firstValue)
}

const expectToExecuteMethodPerItem = (methodName) => {
  const {frozen} = buildMockFrozen()
  var times = 0
  frozen[methodName](() => { times += 1 })
  expect(times).toBe(frozen.length)
}

const expectToPassValueIndexToCallback = (methodName) => {
  const {frozen} = buildMockFrozen()
  frozen[methodName]((value, index) => {
    expect(value).toBe(frozen[index])
  })
}
/*
  TESTS
 */
describe('freezeArray', () => {
  describe(':constructor', () => {
    it('returns an immutable object', () => {
      const {frozen} = buildMockFrozen()
      expectToBeImmutable(frozen)
    })
    it('returns an array with the value as the original one', () => {
      const source = createMockArray()
      const target = freezeArray(source)
      expect(Array.isArray(target)).toBe(true, 'not an array')
      source.forEach((key) => {
        expect(source[key]).toBe(target[key])
      })
    })
    it('adds isImmutable property', () => {
      const source = createMockArray()
      const target = freezeArray(source)
      expect(target.isImmutable).toBe(true)
    })
  })

  describe('.length', () => {
    it('returns array\'s length', () => {
      const source = createMockArray()
      const target = freezeArray(source)
      expect(target.length).toBe(source.length)
    })
  })

  describe('.forEach', () => {
    it('executes the callback as many times as items in the Array', () => {
      expectToExecuteMethodPerItem('forEach')
    })
    it('passes to the callback the value and index for each element', () => {
      expectToPassValueIndexToCallback('forEach')
    })
  })

  describe('.map', () => {
    it('executes the callback as many times as items in the Array', () => {
      expectToExecuteMethodPerItem('map')
    })
    it('passes to the callback the value and index for each element', () => {
      expectToPassValueIndexToCallback('map')
    })
    it('returns a frozen Array with the same size', () => {
      const {frozen} = buildMockFrozen()
      const mapped = frozen.map((value) => value)
      expect(mapped.length).toBe(frozen.length, 'wrong length')
      expect(mapped).toNotBe(frozen, 'same array')
      expect(mapped.isImmutable).toBe(true)
    })
  })

  describe('.filter', () => {
    it('executes the callback as many times as items in the Array', () => {
      expectToExecuteMethodPerItem('filter')
    })
    it('passes to the callback the value and index for each element', () => {
      expectToPassValueIndexToCallback('filter')
    })
    it('filters elements', () => {
      const {frozen} = buildMockFrozen()
      const filtered = frozen.filter((value) => typeof value === 'function')
      expect(filtered.length).toBe(1)
    })
    it('returns another FrozenArray', () => {
      const {frozen} = buildMockFrozen()
      const filtered = frozen.filter((value) => typeof value === 'function')
      expect(filtered.isImmutable).toBe(true)
    })
  })

  describe('.reduce', () => {
    it('executes the callback as many times as items in the Array', () => {
      expectToExecuteMethodPerItem('reduce')
    })
    it('passes to the callback the accumulated value, the value and index for each element', () => {
      const {frozen} = buildMockFrozen()
      const accumulator = Symbol('acc')
      const times = frozen.reduce((acc, value, index) => {
        expect(value).toBe(frozen[index], 'callback\'s value does not match')
        expect(acc).toBe(accumulator, 'accumulator is not being passed')
        return acc
      }, accumulator)
      expect(times)
    })
  })

  describe('.concat', () => {
    it('returns same values as native Array method', () => {
      const {source, frozen} = buildMockFrozen()
      const concatenation = ['a', 'b']
      const plainOutput = source.concat(concatenation)
      const concatFrozen = frozen.concat(concatenation)
      plainOutput.forEach((value, index) => {
        expect(concatFrozen[index]).toBe(value)
      })
    })
    it('returns another FrozenArray', () => {
      const {frozen} = buildMockFrozen()
      const concatFrozen = frozen.concat(['a', 'b'])
      expect(concatFrozen.length).toBe(frozen.length + 2)
      expect(concatFrozen.isImmutable).toBe(true)
    })
  })

  describe('.push', () => {
    it('add new element to the end', () => {
      const {frozen} = buildMockFrozen()
      const addedElement1 = {a: 1}
      const addedElement2 = {a: 2}
      const target = frozen.push(addedElement1, addedElement2)
      expect(target.length).toBe(frozen.length + 2, 'bad length')
      expect(target[target.length - 2]).toBe(addedElement1, 'not in the last position')
      expect(target[target.length - 1]).toBe(addedElement2, 'not in the last position')
      expectToBeImmutable(target)
    })
  })

  describe('.pop', () => {
    it('returns a new frozenArray without the last element', () => {
      const {frozen} = buildMockFrozen()
      const target = frozen.pop()
      expectToBeImmutable(target)
      expect(target.length).toBe(frozen.length - 1, 'bad length')
      frozen.forEach((value, index) => {
        if (index < frozen.length - 1) {
          expect(target[index]).toBe(value, 'value not match')
        } else {
          expect(target[index]).toBe(undefined)
        }
      })
    })
  })

  describe('.shift', () => {
    it('returns a new frozenArray without the first element', () => {
      const {frozen} = buildMockFrozen()
      const target = frozen.shift()
      expectToBeImmutable(target)
      expect(target.length).toBe(frozen.length - 1, 'bad length')
      frozen.forEach((value, index) => {
        if (index === 0) {
          expect(target[index]).toNotBe(value)
        } else {
          expect(target[index - 1]).toBe(value)
        }
      })
    })
  })

  describe('.unshift', () => {
    it('returns a new frozenArray with the values prepended', () => {
      const {frozen} = buildMockFrozen()
      const addedElement1 = {a: 1}
      const addedElement2 = {a: 2}
      const target = frozen.unshift(addedElement1, addedElement2)
      expect(target.length).toBe(frozen.length + 2, 'bad length')
      expect(target[0]).toBe(addedElement1, 'bad first element')
      expect(target[1]).toBe(addedElement2, 'bad second element')
      expectToBeImmutable(target)
    })
  })

  describe('.join', () => {
    it('joints all elements into one string', () => {
      const {source, frozen} = buildMockFrozen(['a', 'b'])
      const result = frozen.join(' ')
      expect(result).toBe(source.join(' '), 'not work as native method')
    })
  })

  describe('.find', () => {
    it('returns first element that matches with the callback', () => {
      const {source, frozen} = buildMockFrozen()
      const callback = (value) => value === true
      expect(frozen.find(callback))
        .toBe(source.find(callback), 'not work as native method')

      expect(frozen.find(() => false))
        .toBe(source.find(() => false), 'not work as native method')
    })
  })

  describe('.findIndex', () => {
    it('returns first element\'s index that matches with the callback', () => {
      const {source, frozen} = buildMockFrozen()
      const callback = (value) => value === true
      expect(frozen.findIndex(callback))
        .toBe(source.findIndex(callback), 'not work as native method')

      expect(frozen.findIndex(() => false))
        .toBe(source.findIndex(() => false), 'not work as native method')
    })
  })

  describe('.reverse', () => {
    it('returns a new FrozenArray with reversed values', () => {
      const {frozen} = buildMockFrozen()
      const lastIndex = frozen.length - 1
      frozen.reverse().forEach((value, index) => {
        expect(frozen[lastIndex - index]).toBe(value)
      })
      expect(frozen.reverse()).toNotBe(frozen, 'is mutating original object')
    })
  })

  describe('.indexOf', () => {
    it('returns the index for an element in the array', () => {
      const {source, frozen} = buildMockFrozen()
      const target = source[1]
      expect(frozen.indexOf(target)).toBe(1)
    })
    it('returns -1 when doesn\'t find anything', () => {
      const {frozen} = buildMockFrozen()
      expect(frozen.indexOf(Symbol())).toBe(-1)
    })
  })

  describe('.insertAt', () => {
    it('returns a new FrozenArray with the value at position specified', () => {
      const {frozen} = buildMockFrozen()
      const position = 1
      const newValue = {foo: 'moo'}
      const target = frozen.insertAt(position, newValue)
      expectToBeImmutable(target)
      expect(target[position]).toBe(newValue, 'bad insertion')
      expect(target.length).toBe(frozen.length + 1, 'bad length')
    })
  })

  describe('.deleteAt', () => {
    it('returns a new FrozenArray without the value at the specified position', () => {
      const {frozen} = buildMockFrozen()
      const position = 1
      const target = frozen.deleteAt(position)
      expectToBeImmutable(target)
      expect(target.length).toBe(frozen.length - 1, 'bad length')
      frozen.forEach((value, index) => {
        if (index < position) {
          expect(target[index]).toBe(value)
        } else if (index > position) {
          expect(target[index - 1]).toBe(value)
        }
      })
    })
  })

  describe('.set', () => {
    it('returns a new FrozenArray with the value at position specified updated', () => {
      const {frozen} = buildMockFrozen()
      const position = 1
      const newValue = {foo: 'moo'}
      const target = frozen.set(position, newValue)
      expectToBeImmutable(target)
      expect(target[position]).toBe(newValue, 'bad insertion')
      expect(target.length).toBe(frozen.length, 'bad length')
    })
  })
  describe('.update', () => {
    it('passes the object to update as an argument for the passed callback', () => {
      const {frozen} = buildMockFrozen()
      const position = 2
      const updater = createSpy()
      frozen.update(position, updater)
      expect(updater).toHaveBeenCalledWith(frozen[position])
    })
    it('updates the object with the value provided by the callback', () => {
      const {frozen} = buildMockFrozen()
      const position = 1
      const newValue = {foo: 'moo'}
      const updater = () => newValue
      const target = frozen.update(position, updater)
      expectToBeImmutable(target)
      expect(target[position]).toBe(newValue)
      expect(target.length).toBe(frozen.length)
    })
  })
  describe('.setIn', () => {
    it('returns a new FrozenArray with the deep value updated', () => {
      const {frozen} = buildMockDeepFrozen()
      const newValue = 'newValue'
      const target = frozen.setIn([4, 'a', 0], newValue)
      expect(target[4]['a'][0]).toBe(newValue)
    })
    it('returns a new FrozenArray for each level where a value has change', () => {
      const {frozen} = buildMockDeepFrozen()
      const newValue = 'newValue'
      const target = frozen.setIn([4, 'a', 0], newValue)
      expect(target[4]).toNotBe(frozen[4])
      expect(target[4]['a']).toNotBe(frozen[4]['a'])
    })
  })
  describe('.updateIn', () => {
    it('passes the object to update as an argument for the passed callback', () => {
      const {frozen} = buildMockDeepFrozen()
      const updater = createSpy()
      frozen.updateIn([4, 'a'], updater)
      expect(updater).toHaveBeenCalledWith(frozen[4]['a'])
    })
    it('updates the object with the value provided by the callback', () => {
      const {frozen} = buildMockDeepFrozen()
      const newValue = 'newValue'
      const updater = () => newValue
      const target = frozen.updateIn([4, 'a'], updater)
      expect(target[4]['a']).toBe(newValue)
    })
  })
  describe('.splice', () => {
    it('removes elements pointed at second argument from first argument', () => {
      const {frozen} = buildMockDeepFrozen()
      const initialIndex = 1
      const elementsToRemove = 2
      const target = frozen.splice(initialIndex, elementsToRemove)
      expect(target.length).toBe(frozen.length - elementsToRemove)
      expect(target[0]).toBe(frozen[0])
      expect(target[1]).toBe(frozen[3])
      expect(target[2]).toBe(frozen[4])
    })
    it('adds elements at desired index', () => {
      const {frozen} = buildMockDeepFrozen()
      const addedElement1 = Symbol(1)
      const addedElement2 = Symbol(2)
      const target = frozen.splice(1, 0, addedElement1, addedElement2)
      expect(target.length).toBe(frozen.length + 2)
      expect(target[0]).toBe(frozen[0])
      expect(target[1]).toBe(addedElement1)
      expect(target[2]).toBe(addedElement2)
      expect(target[3]).toBe(frozen[1])
      expect(target[4]).toBe(frozen[2])
    })
    it('returns an immutable array', () => {
      const {frozen} = buildMockDeepFrozen()
      const addedElement1 = Symbol(1)
      const addedElement2 = Symbol(2)
      const target = frozen.splice(1, 0, addedElement1, addedElement2)
      expectToBeImmutable(target)
    })
  })
  describe('.toJS', () => {
    it('returns mutable source object', () => {
      const {source, frozen} = buildMockFrozen()
      expect(frozen.toJS()).toBe(source)
    })
  })
})

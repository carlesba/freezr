import expect from 'expect'
import {FrozenObject, FrozenArray} from '../src/index'
import freeze from '../src/freeze'

describe('freeze', () => {
  it('returns a FrozenObject when passing an object', () => {
    const target = {
      a: {
        foo: 'foo',
        bar: 'bar'
      },
      b: 2
    }
    const result = freeze(target)
    expect(result instanceof FrozenObject).toBe(true, 'not instance of FrozenObject')
  })
  it('returns a FrozenArray when passing an array', () => {
    const target = [1, {a: 1, b: 2}, 3]
    const result = freeze(target)
    expect(result instanceof FrozenArray).toBe(true, 'not instance of FrozenArray')
  })
  it('keeps a function as it is', () => {
    const target = function () {}
    const result = freeze(target)
    expect(result).toBe(target, 'input has being modified')
  })
  it('keeps a string as it is', () => {
    const target = 'target'
    const result = freeze(target)
    expect(result).toBe(target, 'input has being modified')
  })
  it('keeps a number as it is', () => {
    const target = 123123
    const result = freeze(target)
    expect(result).toBe(target, 'input has being modified')
  })
  it('keeps untouch the second layer on an object', () => {
    const target = {
      a: {
        foo: 'foo',
        bar: 'bar'
      },
      b: 2
    }
    const result = freeze(target)
    expect(result.a).toBe(target.a, 'second layer has been frozen')
  })
  it('keeps untouch the second layer of an Array', () => {
    const target = [1, {a: 1, b: 2}, 3]
    const result = freeze(target)
    expect(result[1]).toBe(target[1], 'second layer has being frozen')
  })
})

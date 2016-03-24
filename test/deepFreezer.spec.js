import expect from 'expect'
import deepFreeze from '../src/deepFreeze'

describe('deepFreeze', () => {
  it('returns a FrozenObject when passing an object', () => {
    const target = {
      a: {foo: 'foo', bar: 'bar'},
      b: 2
    }
    const result = deepFreeze(target)
    expect(result.isImmutable).toBe(true)
  })
  it('returns a FrozenArray when passing an array', () => {
    const target = [1, {a: 1, b: 2}, 3]
    const result = deepFreeze(target)
    expect(result.isImmutable).toBe(true)
  })
  it('keeps a function as it is', () => {
    const target = function () {}
    const result = deepFreeze(target)
    expect(result).toBe(target, 'input has being modified')
  })
  it('keeps a string as it is', () => {
    const target = 'target'
    const result = deepFreeze(target)
    expect(result).toBe(target, 'input has being modified')
  })
  it('keeps a number as it is', () => {
    const target = 123123
    const result = deepFreeze(target)
    expect(result).toBe(target, 'input has being modified')
  })
  it('freezes all layers when passing an object', () => {
    const target = {
      o1: {
        s11: 'a',
        n12: 1,
        a13: [1, 2],
        f14: function () {},
        o15: {
          s151: 'a',
          n152: 1,
          a153: [1, 2],
          f154: function () {},
          o155: {
            f: function () {}
          }
        }
      },
      a2: ['', 'bazz', function () {}]
    }
    const result = deepFreeze(target)
    expect(result.isImmutable).toBe(true)
    expect(result.o1.isImmutable).toBe(true)
    expect(result.o1.s11).toBe(target.o1.s11)
    expect(result.o1.n12).toBe(target.o1.n12)
    expect(result.o1.a13.isImmutable).toBe(true)
    expect(result.o1.f14).toBe(target.o1.f14)
    expect(result.o1.o15.isImmutable).toBe(true)
    expect(result.o1.o15.s151).toBe(target.o1.o15.s151)
    expect(result.o1.o15.n152).toBe(target.o1.o15.n152)
    expect(result.o1.o15.a153.isImmutable).toBe(true)
    expect(result.o1.o15.f154).toBe(target.o1.o15.f154)
    expect(result.o1.o15.o155.isImmutable).toBe(true)
    expect(result.a2.isImmutable).toBe(true)
    expect(result.a2[0]).toBe(target.a2[0])
    expect(result.a2[1]).toBe(target.a2[1])
    expect(result.a2[2]).toBe(target.a2[2])
  })
})

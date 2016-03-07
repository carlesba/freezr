import {
  buildMockObjectFrozen,
  buildMockObjectDeepFrozen,
  buildMockArrayFrozen,
  buildMockArrayDeepFrozen,
  expectToBeImmutableAndThrowError
} from './helpers'

describe('freezr', function () {
  it('returns an immutable object', () => {
    const { frozen } = buildMockObjectFrozen()
    expectToBeImmutableAndThrowError(frozen)
  })

  it('returns an immutable array', () => {
    const { frozen } = buildMockArrayFrozen()
    expectToBeImmutableAndThrowError(frozen)
  })

  describe('deepFreeze', function () {
    describe('return a FrozenObject nested with the possibles FozenObjects', function () {
      it('should the nested objectes be immutable', function () {
        const { frozen } = buildMockObjectDeepFrozen()
        expectToBeImmutableAndThrowError(frozen)
        expectToBeImmutableAndThrowError(frozen.first)
        expectToBeImmutableAndThrowError(frozen.third.third_first)
      })
    })
    describe('return a FrozenArray nested with the possibles FozenArray', function () {
      it('should the nested arrays be immutable', function () {
        const { frozen } = buildMockArrayDeepFrozen()
        console.log(frozen)
        console.log('frozen[0]', frozen[0])
        expectToBeImmutableAndThrowError(frozen)
        expectToBeImmutableAndThrowError(frozen[0])
      })
    })
  })
})

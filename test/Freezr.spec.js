import {
  buildMockObjectFrozen,
  buildMockObjectDeepFrozen,
  buildMockArrayFrozen,
  // buildMockArrayDeepFrozen,
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

  describe('deepFreezr', function () {
    describe('return a FrozenObject nested with the possibles FozenObjects', function () {
      it('should the nested objectes be immutable', function () {
        const { frozen } = buildMockObjectDeepFrozen()
        expectToBeImmutableAndThrowError(frozen)
        expectToBeImmutableAndThrowError(frozen.first)
        expectToBeImmutableAndThrowError(frozen.third.third_first)
      })
    })
  })
})

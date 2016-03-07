import {
  buildMockObjectFrozen,
  buildMockObjectDeepFrozen,
  buildMockArrayFrozen,
  buildMockArrayDeepFrozen,
  expectToBeImmutableAndThrowError
} from './helpers'

describe('freezers', function () {
  describe('freezr', function () {
    it('returns an immutable object', () => {
      const { frozen } = buildMockObjectFrozen()
      expectToBeImmutableAndThrowError(frozen)
    })

    it('returns an immutable array', () => {
      const { frozen } = buildMockArrayFrozen()
      expectToBeImmutableAndThrowError(frozen)
    })
  })

  describe('deepFreeze', function () {
    it('should return FrozenObjects nested with the possibles FozenObjects', function () {
      const { frozen } = buildMockObjectDeepFrozen()
      expectToBeImmutableAndThrowError(frozen)
      expectToBeImmutableAndThrowError(frozen.first)
      expectToBeImmutableAndThrowError(frozen.third.third_first)
    })
    it('should return FrozenArrays nested with the possibles FozenArrays', function () {
      const { frozen } = buildMockArrayDeepFrozen()
      expectToBeImmutableAndThrowError(frozen)
      expectToBeImmutableAndThrowError(frozen[0])
    })
  })
})

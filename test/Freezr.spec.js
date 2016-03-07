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
    it('', function () {
      const { frozen } = buildMockObjectDeepFrozen()
      console.log(frozen.first)
      expectToBeImmutableAndThrowError(frozen)
      expectToBeImmutableAndThrowError(frozen.first)
      // expectToBeImmutableAndThrowError(frozen.third.third_first)
    })
  })
})

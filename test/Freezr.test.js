import {
  buildMockArrayFrozen,
  buildMockObjectFrozen,
  expectToBeImmutableAndThrowError
} from './helpers'

describe('Freezr', function () {
  describe(':constructor', function () {
    it('returns an immutable object', () => {
      const { frozen } = buildMockObjectFrozen()
      expectToBeImmutableAndThrowError(frozen)
    })

    it('returns an immutable array', () => {
      const { frozen } = buildMockArrayFrozen()
      expectToBeImmutableAndThrowError(frozen)
    })
  })
})

import { expectToBeImmutableAndThrowError } from './helpers'
import { freeze, deepFreeze } from '../src/freezers'

const createMockArray = () => {
  return [
    1,
    2,
    () => 3,
    true,
    {a: 1}
  ]
}

const createMockObject = () => {
  return {
    a: 1,
    b: 2,
    c: () => 3
  }
}

const buildMockObjectFrozen = (source = createMockObject()) => {
  return {
    source,
    frozen: freeze(source)
  }
}

const buildMockArrayFrozen = (source = createMockArray()) => {
  return {
    source,
    frozen: freeze(source)
  }
}

const buildMockObjectDeepFrozen = (source = createMockObject()) => {
  return {
    source,
    frozen: deepFreeze(source)
  }
}

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
      const obj = {
        lola: {
          name: 'david'
        },
        name: 'carlesba'
      }
      const { frozen } = buildMockObjectDeepFrozen(obj)
      expectToBeImmutableAndThrowError(frozen)
      expectToBeImmutableAndThrowError(frozen.lola)
    })
  })
})

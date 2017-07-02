import test from 'tape'
import {freeze as f, deepFreeze as df} from './creation'
import {isFreezable} from './creation-utils'

const assertNotFreeze = (t, o, deep) =>
  t.equal(deep ? df(o) : f(o), o, 'should not freeze')

const assertIsImmutable = (t, o) => {
  if (!isFreezable(o)) return
  Object.keys(o).forEach((key) => t.throws(
      () => { o[key] = 'new value' },
      'should throw error when setting value in strict mode'
    )
  )
}

const assertHasToJSON = (t, o) => isFreezable(o)
  ? t.ok(o.toJSON, 'should have toJSON')
  : null

export const assertIsFrozen = (t, o) => {
  assertIsImmutable(t, o)
  assertHasToJSON(t, o)
}

const assertDeepFrozen = (t) => {
  const sampleO = { a: 1, b: '2', c: [], d: () => {}, e: null, f: undefined }
  const sampleA = [1, '2', [], () => {}, null, undefined]
  const source = {
    o: sampleO,
    a: sampleA
  }
  const fSource = df(source)
  assertIsFrozen(t, fSource.o)
  assertIsFrozen(t, fSource.a)
}

test('freeze', (t) => {
  assertNotFreeze(t, () => {})
  assertNotFreeze(t, 'strings')
  assertNotFreeze(t, 1213)

  assertIsFrozen(t, f({a: 1, b: '2', c: '3'}))
  assertIsFrozen(t, f([1, 2, 'foo', () => {}]))
  t.end()
})

test('deepFreeze', (t) => {
  const deep = true
  assertNotFreeze(t, () => {}, deep)
  assertNotFreeze(t, 'strings', deep)
  assertNotFreeze(t, 1213, deep)

  assertIsFrozen(t, df({a: 1, b: '2', c: '3'}))
  assertIsFrozen(t, df([1, 2, 'foo', () => {}]))

  assertDeepFrozen(t)

  t.end()
})

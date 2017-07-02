import test from 'tape'
import {
  freeze as f,
  deepFreeze as df
} from './creation'
import {
  checkPath,
  getIn,
  set,
  update,
  updateIn,
  setIn
} from './methods'
// import {printObject} from './methods-utils'
import {
  assertIsFrozen
} from './creation.spec'
// import { assertMethod } from './methods-test-utils'

test('checkPath', (t) => {
  const source = { a: { b: { c: [ 0, 1, 2 ] } } }
  const fsource = df(source)
  t.equal(
    checkPath(['a', 'b', 'c', 0], 'checkPath', fsource),
    true,
    'should return true when path is fully frozen'
  )
  t.throws(function () {
    checkPath(['a'], 'checkPath', source)
  })

  t.end()
})

test('getIn', (t) => {
  const source = { a: { b: { c: [1] } } }
  const fo = df(source)

  // valid paths
  t.equal(fo.getIn(['a', 'b', 'c', 0]), 1)
  t.equal(fo.getIn(['a', 'b']), fo.a.b)
  t.equal(fo.getIn(['a']), fo.a)

  // invalid pathds
  t.equal(fo.getIn(['b']), undefined, 'should be undefined when doesnt exist')
  t.equal(fo.getIn(['a', 'c']), undefined, 'should be undefined when doesnt exist')

  // when forcing frozen pathds
  t.equal(
    getIn(['a', 'b', 'c'], source, true),
    undefined,
    'should return undefined when path is not fully frozen'
  )

  t.equal(
    getIn(['a', 'b', 'c'], fo, true),
    fo.a.b.c,
    'should return undefined when path is not fully frozen'
  )

  t.end()
})

test('set', (t) => {
  const source = { a: 1, b: { bb: 2 }, c: 1 }
  const result = set('a', 2, source)
  assertIsFrozen(t, result)
  t.equal(result.a, 2, 'should set value')
  t.equal(result.b, source.b, 'should keep other values')
  t.equal(result.c, source.c, 'should keep other values')

  t.comment('::as method')
  const fsource = df(source)
  const result2 = fsource.set('b', 3)
  assertIsFrozen(t, result2)
  t.equal(result2.b, 3, 'should set value')
  t.equal(result2.a, source.a, 'should keep other values')
  t.equal(result2.c, source.c, 'should keep other values')

  t.comment('::with arrays')
  const source2 = [0, 1, 2]
  const result3 = set(0, 1, source2)
  assertIsFrozen(t, result3)
  t.equal(result3[0], 1, 'should set value')
  t.equal(result3[1], 1, 'should keep other vaules')
  t.equal(result3[2], 2, 'should keep other vaules')

  t.end()
})

const assertSetInWithMinimumPaths = (t) => {
  t.comment('::with empty path')
  const source = { a: { b: { c: 1 } } }
  const fsource = df(source)
  const fsource1 = setIn([], 444, fsource)
  t.equal(
    fsource1,
    fsource1,
    'should return identity when path is empty'
  )
  t.comment('::path with only one element')
  const fsource2 = setIn(['a'], 1, fsource)
  t.equal(fsource2.a, 1, 'should set the value')
  assertIsFrozen(t, fsource2)
}

const assertSetInDeepSet = (t) => {
  t.comment('::deep set object')
  const source = { a: { b: { c: 1 }, bb: 2, bbb: 3 } }
  const fo = df(source)
  const result = fo.setIn(['a', 'b'], 2)
  assertIsFrozen(t, result)
  t.equal(result.a.b, 2)
  t.equal(result.a.bb, 2)
  t.equal(result.a.bbb, 3)
}
const assertSetInArray = (t) => {
  t.comment('::deep set array')
  const source = [ {a: 1}, {a: 2}, {b: 3} ]
  const fsource = df(source)
  const result = fsource.setIn([0, 'a'], 2)
  assertIsFrozen(t, result)
  t.equal(result[0].a, 2, 'should set value')
  t.same(result[1], source[1], 'should keep other values')
}

test('setIn', (t) => {
  assertSetInWithMinimumPaths(t)
  assertSetInDeepSet(t)
  assertSetInArray(t)
  t.end()
})

test('update', (t) => {
  const source = { a: 1, b: { bb: 2 }, c: 1 }
  const result = update('a', (a) => a + 1, source)
  assertIsFrozen(t, result)
  t.equal(result.a, 2, 'should set value')
  t.equal(result.b, source.b, 'should keep other values')
  t.equal(result.c, source.c, 'should keep other values')

  t.comment('::as method')
  const fsource = df(source)
  const result2 = fsource.update('b', () => 3)
  assertIsFrozen(t, result2)
  t.equal(result2.b, 3, 'should set value')
  t.equal(result2.a, source.a, 'should keep other values')
  t.equal(result2.c, source.c, 'should keep other values')

  t.comment('::with arrays')
  const source2 = [0, 1, 2]
  const result3 = update(0, (item) => item + 1, source2)
  assertIsFrozen(t, result3)
  t.equal(result3[0], 1, 'should set value')
  t.equal(result3[1], 1, 'should keep other vaules')
  t.equal(result3[2], 2, 'should keep other vaules')

  t.end()
})

const assertUpdateInDeepSet = (t) => {
  t.comment('::deep set object')
  const source = { a: { b: { c: 1 }, bb: 2, bbb: 3 } }
  const fo = df(source)
  const result = fo.updateIn(['a', 'b'], (b) => 2)
  assertIsFrozen(t, result)
  t.equal(result.a.b, 2)
  t.equal(result.a.bb, 2)
  t.equal(result.a.bbb, 3)
}
const assertUpdateInArray = (t) => {
  t.comment('::deep set array')
  const source = [ {a: 1}, {a: 2}, {b: 3} ]
  const fsource = df(source)
  fsource.slice(1)
  // const result = fsource.updateIn([0, 'a'], (a) => a + 1)
  // assertIsFrozen(t, result)
  // console.log('::::', result)
  // t.equal(result[0].a, 2, 'should set value')
  // t.same(result[1], source[1], 'should keep other values')
}

// test.only('updateIn', (t) => {
//   // assertUpdateInDeepSet(t)
//   assertUpdateInArray(t)
//   t.end()
// })

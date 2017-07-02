import test from 'tape'
import {isFreezable, doNew} from './creation-utils'
import {freeze as f} from './creation'

test('isFreezable', (t) => {
  t.equal(isFreezable(null), false)
  t.equal(isFreezable(undefined), false)
  t.equal(isFreezable('a'), false)
  t.equal(isFreezable(1), false)
  t.equal(isFreezable(function () {}), false)
  t.equal(isFreezable({a: 1}), true)
  t.equal(isFreezable([1, 2]), true)
  t.end()
})

const assertIsNewArray = (t, source, target) => {
  t.notEqual(source, target, 'should be new instance')
  for (let index = 0; index < source.length; index++) {
    t.equal(target[index], source[index], 'should have same values')
  }
  t.equal(source.length, target.length, 'should have same length')
}

const assertIsNewObj = (t, source, target) => {
  t.notEqual(source, target, 'should be new instance')
  Object.keys(source).forEach((key, index) => {
    t.equal(target[key], source[key], 'should have same values')
  })
  t.equal(
    Object.keys(source).length,
    Object.keys(target).length,
    'should keep same amount of attributes'
  )
}

test('doNew', (t) => {
  const refArray = [0, 1, 2]
  const refObj = {a: 1, b: 2}
  const frozenArray = f(refArray)
  const frozenObj = f(refObj)
  assertIsNewArray(t, refArray, doNew(refArray))
  assertIsNewArray(t, frozenArray, doNew(frozenArray))
  assertIsNewObj(t, refObj, doNew(refObj))
  assertIsNewObj(t, frozenObj, doNew(frozenObj))
  t.end()
})

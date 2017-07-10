import test from 'tape'
import {
  push,
  includes
} from '../src/array-methods'
import {assertIsFrozen} from './creation.spec'
import {freeze as f, deepFreeze as df} from '../src/creation'

const assertEachItem = (t, source, target) =>
  source.forEach((item, index) => t.equal(target[index], item))

test('forEach', (t) => {
  const source = [0, 1, 2, 3]
  const fsource = f(source)
  fsource.forEach((value, index) => t.equal(fsource[index], value))
  t.end()
})

test('map', (t) => {
  const newValue = 'foo'
  const source = [0, 1, 2, 3]
  const fsource = f(source)
  const target = fsource.map((value, index) => {
    t.equal(fsource[index], value)
    return 'foo'
  })
  target.forEach((value) => {
    t.equal(value, newValue)
  })
  assertIsFrozen(target)
  t.end()
})

test('filter', (t) => {
  const source = [0, 1, 2, 3]
  const fsource = f(source)
  const target = fsource.filter((value, index) => {
    t.equal(fsource[index], value)
    return value < 2
  })
  target.forEach((value, index) => {
    t.equal(value, fsource[index])
  })
  t.equal(target.length, 2, 'should filter elements')
  assertIsFrozen(target)
  t.end()
})

test('reduce', (t) => {
  const source = [0, 1, 2, 3]
  const fsource = f(source)
  const target = fsource.reduce((acc, iter, index) => {
    t.equal(fsource[index], iter)
    return acc + iter
  }, 0)
  t.equal(target, 6, 'should reduce elements')
  t.end()
})

test('push', (t) => {
  t.comment('::as function')
  const newElement = 4
  const source = [0, 1, 2, 3]
  const target = push(newElement, source)
  assertEachItem(t, source, target)
  t.equal(target[source.length], newElement, 'should append')
  assertIsFrozen(target)

  t.comment('::as method')
  const dfSource = df(source)
  const target2 = dfSource.push(newElement)
  assertEachItem(t, dfSource, target2)
  t.equal(target2[dfSource.length], newElement, 'should append')

  t.end()
})

test('unshift', (t) => {
  const newElement = 4
  const source = [0, 1, 2, 3]
  const fsource = df(source)
  const target = fsource.unshift(newElement)
  assertEachItem(t, target, [4, 0, 1, 2, 3])
  t.equal(target[0], newElement, 'should append')

  t.end()
})

test('pop', (t) => {
  const source = [0, 1, 2, 3]
  const fsource = f(source)
  const target = fsource.pop()
  assertEachItem(t, target, source)
  t.equal(target.length, fsource.length - 1, 'removes last item')
  assertIsFrozen(target)
  t.end()
})

test('shift', (t) => {
  const source = [0, 1, 2, 3]
  const fsource = f(source)
  const target = fsource.shift()
  assertEachItem(t, target, [1, 2, 3])
  t.equal(target.length, fsource.length - 1, 'removes last item')
  assertIsFrozen(target)
  t.end()
})
test('first', (t) => {
  const target = f([0, 1, 2])
  t.equal(target.first(), 0)
  t.end()
})
test('last', (t) => {
  const target = f([0, 1, 2])
  t.equal(target.last(), 2)
  t.end()
})
test('splice', (t) => {
  t.comment('::inserting')
  const origin = f([0, 1, 2])
  const target1 = origin.splice(0, 0, 'foo')
  assertIsFrozen(target1)
  t.equal(target1[0], 'foo')

  t.comment('::removing')
  const target2 = origin.splice(0, 1)
  assertIsFrozen(target2)
  t.equal(target2.length, origin.length - 1)
  t.equal(target2[1], 2)

  t.comment('::adding multiple')
  const target3 = origin.splice(0, 0, 'foo', 'bar', 'tar')
  assertIsFrozen(target3)
  t.equal(target3[0], 'foo')
  t.equal(target3[1], 'bar')
  t.equal(target3[2], 'tar')
  t.equal(target3.length, origin.length + 3)
  t.end()
})
test('insertAt', (t) => {
  const origin = f([0, 1, 2])
  const target = origin.insertAt(1, 'foo')
  assertIsFrozen(target)
  t.equal(target[1], 'foo')
  t.equal(target.length, origin.length + 1)
  t.end()
})
test('deleteAt', (t) => {
  const origin = f([0, 1, 2])
  const target = origin.deleteAt(1)
  assertIsFrozen(target)
  t.equal(target[1], origin[2])
  t.equal(target.length, origin.length - 1)
  t.end()
})
test('sort', (t) => {
  t.comment('::order ascending')
  const origin = f([1, 0, 2])
  const target = origin.sort((a, b) => a - b)
  assertIsFrozen(target)
  target.forEach((_, index) => t.equal(target[index], index))
  t.notEqual(target, origin)
  t.end()
})
test('reverse', (t) => {
  const origin = f([2, 1, 0])
  const target = origin.reverse()
  assertIsFrozen(target)
  target.forEach((_, index) => t.equal(target[index], index))
  t.notEqual(target, origin)
  t.end()
})
test('join', (t) => {
  const origin = f([0, 1, 2])
  const target = origin.join('x')
  t.equal(target, '0x1x2')
  t.end()
})
test('concat', (t) => {
  const origin = f([0, 1, 2])
  const target = origin.concat([3, 4], [5, 6, 7])
  assertIsFrozen(target)
  t.equal(target.length, 8)
  target.forEach((_, index) => t.equal(target[index], index))
  t.end()
})
test('slice', (t) => {
  const origin = f([0, 1, 2])
  t.comment('::begin')
  const targetA = origin.slice(1)
  assertIsFrozen(targetA)
  t.same(targetA, [1, 2])

  t.comment('::begin and end')
  const targetB = origin.slice(1, 2)
  assertIsFrozen(targetB)
  t.same(targetB, [1])

  t.comment('::negative index')
  const targetC = origin.slice(-1)
  assertIsFrozen(targetC)
  t.same(targetC, [2])

  t.end()
})
test('includes', (t) => {
  const origin = f([0, 1, 2])
  t.equal(origin.includes(1), true)
  t.equal(origin.includes(1, 2), false)
  t.equal(origin.includes('a'), false)
  t.equal(
    includes('a', ['a', 'b']),
    true
  )
  t.equal(
    includes('a', 1, ['a', 'b']),
    false
  )
  t.end()
})

import test from 'tape'
import {freeze as f} from '../src/creation'
import {
  removeLast,
  removeFirst,
  getLast,
  checkFrozen
} from '../src/methods-utils'

test('removeLast', (t) => {
  t.same(
    removeLast([1, 2, 3, 4]),
    [1, 2, 3]
  )
  t.same(
    removeLast([1, 2]),
    [1]
  )
  t.same(
    removeLast([1]),
    []
  )
  t.same(
    removeLast([1, 2, 3, 4], 2),
    [1, 2]
  )
  t.end()
})

test('removeFirst', (t) => {
  t.same(
    removeFirst([1, 2, 3, 4]),
    [2, 3, 4]
  )
  t.same(
    removeFirst([1, 2]),
    [2]
  )
  t.same(
    removeFirst([1]),
    []
  )
  t.same(
    removeFirst([1, 2, 3, 4], 2),
    [3, 4]
  )
  t.end()
})

test('getLast', (t) => {
  t.equal(
    getLast([1, 2, 3, 4]),
    4
  )
  t.end()
})

test('checkFrozen', (t) => {
  t.equal(checkFrozen({a: 1}), false, 'false in plain object')
  t.equal(checkFrozen(f({a: 1})), true, 'true in frozen object')
  t.equal(checkFrozen(1), true, 'true in integers')
  t.equal(checkFrozen(0), true, 'true when 0')
  t.equal(checkFrozen([0, 1]), false, 'false in plain arrays')
  t.equal(checkFrozen(f([0, 1])), true, 'true in frozen array')
  t.equal(checkFrozen(function () {}), true, 'true in functions')
  t.equal(checkFrozen('0'), true, 'true in string 0')
  t.equal(checkFrozen('text random'), true, 'true in strings')
  t.equal(checkFrozen(undefined), true, 'true when undefined')
  t.equal(checkFrozen(null), true, 'true when null')
  t.end()
})

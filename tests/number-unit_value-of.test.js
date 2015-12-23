import test from 'tape'
import { bitcoin } from './_fixtures'

test('valueOf() should return primitive value', function (t) {
  let b1 = bitcoin.BTC(1)
  let b2 = bitcoin.BTC(2)

  let gt21 = b2 > b1
  let gt12 = b1 > b2
  t.true(gt21, '2 > 1')
  t.false(gt12, '1 < 2')

  t.is(b2 + b1, 3, '2 + 1 === 3')
  t.is(b2 + 555, 557, '2 + 555 === 557')
  t.is(b2 - b1, 1, '2 - 1 === 1')

  t.end()
})

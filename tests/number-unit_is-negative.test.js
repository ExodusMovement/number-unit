import test from 'tape'
import { bitcoin } from './_fixtures'

test('isNegative() should return true if negative amount', function (t) {
  let b1 = bitcoin.BTC(1)
  t.false(b1.isNegative, '1 BTC should not be negative')

  let b2 = bitcoin.BTC(-1)
  t.true(b2.isNegative, '-1 BTC should be negative')

  let b3 = bitcoin.BTC(-0)
  // maybe configurable -0?
  t.true(b3.isNegative, '-0 BTC should be negative')

  let b4 = bitcoin.BTC(0)
  t.false(b4.isNegative, '0 BTC should not be negative')

  let b5 = bitcoin.BTC(+0)
  t.false(b5.isNegative, '+0 BTC should not be negative')

  t.end()
})

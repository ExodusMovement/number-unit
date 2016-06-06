import test from 'tape-catch'
import { bitcoin } from './_fixtures'

test('less than with positive numbers', function (t) {
  const b1 = bitcoin.BTC(1.53)
  const b2 = bitcoin.BTC(1.53)
  const b3 = bitcoin.bits(1530001)
  const b4 = bitcoin.BTC(1.54)

  t.false(b1.lt(b2), '1.53 BTC not less than 1.53 BTC')
  t.false(b2.lt(b1), '1.53 BTC not less than 1.53 BTC (reverse)')

  t.false(b3.lt(b1), '1530001 bits is not less than 1.53 BTC')
  t.true(b1.lt(b3), '1.53 BTC is not less than 1530001 bits')

  t.false(b4.lt(b3), '1.54 BTC is not less than 1530001 bits')
  t.true(b3.lt(b4), '1530001 bits is less than 1.54 BTC')

  t.end()
})

test('less than with negative numbers', function (t) {
  const b0 = bitcoin.BTC(0)
  const b1 = bitcoin.BTC(-1)
  const b2 = bitcoin.BTC(-2)
  const b3 = bitcoin.BTC(1)

  t.false(b0.lt(b1), '0 BTC is not less than -1 BTC')
  t.true(b1.lt(b0), '-1 BTC is less than 0 BTC')

  t.false(b1.lt(b2), '-1 BTC is not less than -2 BTC')
  t.true(b2.lt(b1), '-2 BTC is less than -1 BTC')

  t.false(b3.lt(b1), '1 BTC is not less than -1 BTC')
  t.true(b1.lt(b3), '-1 BTC is less than 1 BTC')

  t.end()
})

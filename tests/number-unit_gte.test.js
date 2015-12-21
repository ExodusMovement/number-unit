import test from 'tape'
import { bitcoin } from './_fixtures'

test('greater than with positive numbers', function (t) {
  const b1 = bitcoin.BTC(1.53)
  const b2 = bitcoin.BTC(1.53)
  const b3 = bitcoin.bits(1530001)
  const b4 = bitcoin.BTC(1.54)

  t.true(b1.gte(b2), '1.53 BTC not greater than or equal 1.53 BTC')
  t.true(b2.gte(b1), '1.53 BTC not greater than or equal 1.53 BTC (reverse)')

  t.true(b3.gte(b1), '1530001 bits is greater than 1.53 BTC')
  t.false(b1.gte(b3), '1.53 BTC is not greater than 1530001 bits')

  t.true(b4.gte(b3), '1.54 BTC is greater than 1530001 bits')
  t.false(b3.gte(b4), '1530001 bits is not greater than 1.54 BTC')

  t.end()
})

test('greater than with negative numbers', function (t) {
  const b0 = bitcoin.BTC(0)
  const b1 = bitcoin.BTC(-1)
  const b2 = bitcoin.BTC(-2)
  const b3 = bitcoin.BTC(1)

  t.true(b0.gte(b1), '0 BTC is greater than -1 BTC')
  t.false(b1.gte(b0), '-1 BTC is not greater than 0 BTC')

  t.true(b1.gte(b2), '-1 BTC is greater than -2 BTC')
  t.false(b2.gte(b1), '-2 BTC is not greater than -1 BTC')

  t.true(b3.gte(b1), '1 BTC is greater than -1 BTC')
  t.false(b1.gte(b3), '-1 BTC is not greater than 1 BTC')

  t.end()
})

import test from 'tape-catch'
import { bitcoin } from './_fixtures'

test('is number zero?', function (t) {
  const b1 = bitcoin.BTC(1.53)
  const b2 = bitcoin.BTC(-1.53)
  const b3 = bitcoin.bits(+0)
  const b4 = bitcoin.BTC(-0)
  const b5 = bitcoin.BTC('-0')
  const b6 = bitcoin.BTC('+0')

  t.false(b1.isZero(), '1.53 is not zero')
  t.false(b2.isZero(), '-1.53 is not zero')
  t.true(b3.isZero(), '+0 is zero')
  t.true(b4.isZero(), '-0 is zero')
  t.true(b5.isZero(), '-0 is zero')
  t.true(b6.isZero(), '+0 is zero')

  t.end()
})

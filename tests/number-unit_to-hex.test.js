import test from 'tape-catch'
import { bitcoin } from './_fixtures'

test('toHex()', function (t) {
  let b1 = bitcoin.BTC(15)
  t.equals(b1.toHex(), 'f', 'toHex() of 15 should be f')

  let b2 = bitcoin.BTC(16)
  t.equals(b2.toHex(), '10', 'toHex() of 16 should be 10')

  let b3 = bitcoin.BTC(1.875)
  t.equals(b3.toHex(), '1.e', 'toHex() of 1.14 should be 1.e')

  t.end()
})

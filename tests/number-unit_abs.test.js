import test from 'tape'
import { bitcoin } from './_fixtures'

test('abs() should return absolute value', function (t) {
  const b1 = bitcoin.BTC(-1.53)
  t.equals(b1.toString(), '-1.53 BTC')

  const b2 = b1.abs()
  t.equals(b2.toString(), '1.53 BTC')

  const b3 = b2.abs()
  t.equals(b3.toString(), '1.53 BTC')

  t.end()
})

import test from 'tape-catch'
import { bitcoin } from './_fixtures'

test('negate() should return negated value', function (t) {
  const b1 = bitcoin.BTC(-1.53)
  t.equals(b1.toString(), '-1.53 BTC')
  t.true(b1.isNegative)

  const b2 = b1.negate()
  t.equals(b2.toString(), '1.53 BTC')
  t.false(b2.isNegative)

  const b3 = b2.negate()
  t.equals(b3.toString(), '-1.53 BTC')
  t.true(b3.isNegative)

  t.end()
})

import test from 'tape-catch'
import { bitcoin } from './_fixtures'

test('clamp at zero', function (t) {
  const b1 = bitcoin.BTC(1.53)
  const b2 = bitcoin.BTC(-1.53)

  const b10 = b1.clampLowerZero()
  const b20 = b2.clampLowerZero()

  t.is(b10.toString(), '1.53 BTC', '1.53 BTC NOT clamped to zero')
  t.is(b20.toString(), '0 BTC', '-1.53 BTC clamped to zero')

  t.end()
})

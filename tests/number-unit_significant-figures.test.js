import test from 'tape-catch'
import { bitcoin } from './_fixtures'

test('should not error out on significant figures', function (t) {
  const b1 = bitcoin.BTC(3516.2695380859077)
  t.equals(b1.unitName, 'BTC')
  t.equals(b1.toString(), '3516.2695380859077 BTC')
  t.end()
})

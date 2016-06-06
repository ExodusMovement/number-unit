import test from 'tape-catch'
import { inspect } from 'util'
import { bitcoin } from './_fixtures'

test('inspect()', function (t) {
  let b1 = bitcoin.BTC(1.53)
  let i = inspect(b1)
  t.same(i, '<NumberUnit: 1.53 BTC >', 'should return a string for console.dir / inspect')

  t.end()
})

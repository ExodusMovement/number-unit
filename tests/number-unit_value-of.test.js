import test from 'tape-catch'
import { bitcoin } from './_fixtures'

test('valueOf() should return primitive value', function (t) {
  let b1 = bitcoin.BTC(1)
  let b2 = bitcoin.BTC(2)
  let b3 = bitcoin.satoshis(10000)

  let gt21 = b2 > b1
  let gt12 = b1 > b2
  t.true(gt21, '2 > 1')
  t.false(gt12, '1 < 2')

  t.is(b2 + b1, 3000000, '2 BTC + 1 BTC === 3,000,000 bits')
  t.is(b2 + 555, 2000555, '2 BTC + 555 === 2,000,555 bits')
  t.is(b2 - b1, 1000000, '2 BTC - 1 BTC === 1,000,000 bits')

  t.true(b3 < b2, '10,000 statoshis less than 2 BTC')

  t.end()
})

import test from 'tape-catch'
import { bitcoin } from './_fixtures'

test('JSON stringify should not throw an error', function (t) {
  let b1 = bitcoin.BTC(1.53)
  let json = JSON.stringify(b1)
  t.ok(json, 'JSON stringify did not throw an error')

  t.end()
})

test('toJSON()', function (t) {
  let b1 = bitcoin.BTC('-1.53')

  let json = b1.toJSON()

  t.same(json, {
    value: '-1.53',
    unit: 'BTC',
    unitType: 'currency/crypto-currency/bitcoin',
    type: 'NumberUnit'
  })

  t.end()
})

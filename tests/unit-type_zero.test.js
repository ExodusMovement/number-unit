import test from 'tape'
import { bitcoin, dollar } from './_fixtures'

test('ZERO should return a number-unit with value of 0 in default unit', function (t) {
  const b0 = bitcoin.ZERO
  t.equal(b0.toNumber(), 0, 'bitcoin value is 0')
  t.equal(b0.unit.toString(), 'bits', 'unit is default unit (bits)')

  const d0 = dollar.ZERO
  t.equal(d0.toNumber(), 0, 'dollar value is 0')
  t.equal(d0.unit.toString(), 'USD', 'unit is default unit (USD)')

  t.end()
})

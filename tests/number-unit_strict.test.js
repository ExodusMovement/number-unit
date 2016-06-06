import test from 'tape-catch'
import NumberUnit from '../'
import { bitcoin } from './_fixtures'

test('when strict mode, must specify unit for math operations', function (t) {
  let b1 = bitcoin.BTC(1.53)
  let b2 = b1.add(2)

  t.equal(b2.unit.unitName, 'BTC', 'unit.unitName is BTC')
  t.equal(b2.unit.toString(), 'BTC', 'unit.toString is BTC')
  t.equal(b2.toString(), '3.53 BTC', 'toString() is correct')

  b1.strict = true
  t.throws(function () {
    b1.add(2)
  }, /Strict mode/)

  t.throws(function () {
    b1.subtract(1)
  }, /Strict mode/)

  let b3 = b1.add(bitcoin.BTC(2))
  t.equal(b3.toString(), '3.53 BTC', 'toString() is correct')

  // set global
  let b4 = bitcoin.BTC(1.53)
  t.equal(b4.strict, false)
  NumberUnit.strict = true
  let b5 = bitcoin.BTC(1.53)
  t.equal(b5.strict, true)

  t.end()
})

import test from 'tape-catch'
import { bitcoin, distanceSI } from './_fixtures'

test('parse() should return a NumberUnit from the string representation', function (t) {
  const d1 = distanceSI.parse('3.5 km')
  const d2 = distanceSI.parse('3500 m')

  t.equals(d1.toString(), '3.5 km')
  t.equals(d2.toString(), '3500 m')

  t.true(d1.equals(d2), '3.5 km === 3500 m (from parse)')

  t.end()
})

test('parse() should throw an error if unit is invalid / not found on UnitType', function (t) {
  t.throws(function () {
    distanceSI.parse('3.5 INVALID_UNIT')
  }, /Unit not found/, 'parsing an invalid unit')

  t.end()
})

test('parse() negative numbers', function (t) {
  let num = bitcoin.parse('-5 BTC')
  t.true(num.isNegative, '-5 BTC is negative')
  t.equals(num.toString(), '-5 BTC')

  t.end()
})

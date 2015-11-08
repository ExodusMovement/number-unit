import test from 'tape'
import { bitcoin, dollar, distanceSI } from './fixtures'

test('toDefault() should convert to default unit', function (t) {
  const b1 = bitcoin.BTC(1.53)
  const b2 = b1.toDefault()
  t.equals(b2.unitName, 'bits')
  t.equals(b2.toString(), '1530000 bits')

  let b3 = bitcoin.defaultUnit(1530000)
  t.same(b3.unitName, 'bits')
  t.same(b3.toString(), '1530000 bits')

  t.end()
})

test('defaulUnit()', function (t) {
  t.equals(bitcoin.defaultUnit, bitcoin.bits)
  t.equals(distanceSI.defaultUnit, distanceSI.m)

  t.equals(bitcoin.defaultUnit.unitName, 'bits', 'bitcoin default unit is bits')
  t.equals(dollar.defaultUnit.unitName, 'USD', 'dollar default unit is USD')
  t.equals(distanceSI.defaultUnit.unitName, 'm', 'distance (SI) default unit is m')

  t.end()
})

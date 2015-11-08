import test from 'tape'
import { bitcoin, distanceSI } from './_fixtures'

test('equals() should return true if any number with unit is equivalent', function (t) {
  t.true(bitcoin.BTC('1.53').equals(bitcoin.bits(1530000)), '1.53 BTC === 1530000 bits')
  t.false(bitcoin.BTC('1.53').equals(bitcoin.bits(1530001)), '1.53 BTC !== 1530001 bits ')

  t.true(distanceSI.km(3.5).equals(distanceSI.m(3500)), '3.5 km === 3500 m')
  t.false(distanceSI.km(3.5).equals(distanceSI.m(3500.1)), '3.5 km !== 3500.1 m')

  t.true(distanceSI.parse('3.5 km').equals(distanceSI.parse('3500 m')), '3.5 km === 3500 m (from parse)')

  t.end()
})

import test from 'tape'
import { bitcoin, distanceSI } from './_fixtures'

test('toBase() should convert any unit to base unit', function (t) {
  const amtBTC = bitcoin.BTC(1.53)
  const amtBits = bitcoin.bits(1530000)
  const amtSat1 = amtBTC.toBase()
  const amtSat2 = amtBits.toBase()

  t.equals(amtSat1.unitName, 'satoshis')
  t.equals(amtSat2.unitName, 'satoshis')

  t.equals(amtSat1.toString(), '153000000 satoshis', 'base conversion from BTC')
  t.equals(amtSat2.toString(), '153000000 satoshis', 'base conversion from bits')

  t.true(amtBTC.equals(amtBits), 'verify BTC and bits amounts are equal')
  t.true(amtSat1.equals(amtSat2), 'verify satoshi amounts are equal')

  const distKm = distanceSI.km(3.5)
  const distM = distKm.toBase()

  t.equals(distM.unitName, 'm')

  t.equals(distKm.toString(), '3.5 km', 'verify 3.5 km')
  t.equals(distM.toString(), '3500 m', 'verify 3500 m')
  t.true(distKm.equals(distM), '3.5 km === 35000 m')

  t.end()
})

test('baseUnit() factory function', function (t) {
  let b1 = bitcoin.baseUnit('153000000')
  t.equal(b1.toString(), '153000000 satoshis', 'base conversion')

  let b2 = b1.toBase()
  t.equal(b2.toString(), '153000000 satoshis', 'base conversion')

  t.true(b1.equals(b2), 'equal')

  t.end()
})

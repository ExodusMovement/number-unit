import test from 'tape'
import NumberUnit from '../'
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

  t.ok(bitcoin.BTC('1.53').equals(bitcoin.parse('1530000 bits')), 'parse w/ units')
  t.equal(dollar.parse('100.43 USD').toString(), '100.43 USD', 'parse w/ other units')

  let bits = bitcoins.to(bitcoin.bits)
  t.equal(bits.toString(), '1530000 bits', 'to bits')
  let dollars = NumberUnit.create(456.24, dollar.USD)

  t.equal(bitcoins.add(NumberUnit.create(4, bitcoin.bits)).toString(), '1.530004 BTC', 'adding different units')

  var bitcoinToDollar = new ConversionUnit({
    from: { unitType: bitcoin, BTC: 1 },
    to: { unitType: dollar, USD: 260.53 }
  })

  t.equal(bits.to(dollar.USD, bitcoinToDollar).toString(), '398.6109 USD', 'converting to a different unit')
  t.equal(dollars.to(bitcoin.BTC, bitcoinToDollar.invert()).toString(), '1.7511994779871799793 BTC', 'conversion unit invert()')

  let amount = bits.subtract(NumberUnit.create(0.64, bitcoin.BTC))
  t.equal(amount.toString(), '890000 bits', 'subtract different units')

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

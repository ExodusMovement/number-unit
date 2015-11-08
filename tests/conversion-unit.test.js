import test from 'tape'
import { ConversionUnit, conversion } from '../'
import { bitcoin, dollar } from './_fixtures'

test('ConversionUnit should allow converting from one NumberUnit of some type to another NumberUnit', function (t) {
  let amtBTC = bitcoin.BTC(1.53)

  let bitcoinToDollar = ConversionUnit.create({
    from: { unitType: bitcoin, BTC: 1 },
    to: { unitType: dollar, USD: 381.53 }
  })
  let dollarToBitcoin = bitcoinToDollar.invert()

  let amtInUSD = amtBTC.to(dollar.USD, bitcoinToDollar)
  t.equals(amtInUSD.toString(), '583.7409 USD', '1.53 BTC is 583.7409 USD when 1 BTC is 381.53 USD')
  let amtBackInBTC = amtInUSD.to(bitcoin.BTC, dollarToBitcoin)
  t.equals(amtBackInBTC.toString(), '1.53 BTC')
  t.equals(amtBackInBTC.to('bits').toString(), '1530000 bits')

  // invert should not be required
  // let amtBackInBTC2 = amtInUSD.to(bitcoin.BTC, bitcoinToDollar)
  // t.equals(amtBackInBTC2.toString(), '1.53 BTC')

  t.end()
})

test('conversion() should allow conversion from either unit to either unit', function (t) {
  let bitcoinDollarConversion = conversion(bitcoin.BTC(1), dollar.USD(381.53))
  let amtBTC = bitcoin.BTC(1.53)
  let amtUSD = bitcoinDollarConversion(amtBTC)
  t.equals(amtUSD.toString(), '583.7409 USD', '1.53 BTC is 583.7409 USD when 1 BTC is 381.53 USD')

  let amtBTC2 = bitcoinDollarConversion(amtUSD)
  t.equals(amtBTC2.toString(), '1.53 BTC', '583.7409 USD is 1.53 BTC when 1 BTC is 381.53 USD')

  t.false(amtUSD.equals(amtBTC), 'Two different UnitTypes will never be equal.')

  t.end()
})

test('conversion() should work with NumberUnit.to', function (t) {
  let bitcoinDollarConversion = conversion(bitcoin.BTC(1), dollar.USD(381.53))
  let amtBTC = bitcoin.BTC(1.53)
  let amtUSD = amtBTC.to(dollar.USD, bitcoinDollarConversion)

  t.equals(amtUSD.toString(), '583.7409 USD', '1.53 BTC is 583.7409 USD when 1 BTC is 381.53 USD')

  let amtBTC2 = amtUSD.to(bitcoin.BTC, bitcoinDollarConversion)
  t.equals(amtBTC2.toString(), '1.53 BTC', '583.7409 USD is 1.53 BTC when 1 BTC is 381.53 USD')

  t.end()
})

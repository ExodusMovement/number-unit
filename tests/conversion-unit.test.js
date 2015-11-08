import test from 'tape'
import { ConversionUnit } from '../'
import { bitcoin, dollar } from './_fixtures'

test('ConversionUnit should allow converting from one NumberUnit of some type to another NumberUnit', function (t) {
  let amtBTC = bitcoin.BTC(1.53)
  // let amtBits = amtBTC.to('bits')
  // let amtUSD = dollar.USD(2493)

  let bitcoinToDollar = new ConversionUnit({
    from: { unitType: bitcoin, BTC: 1 },
    to: { unitType: dollar, USD: 381.53 }
  })
  let dollarToBitcoin = bitcoinToDollar.invert()

  let amtInUSD = amtBTC.to(dollar.USD, bitcoinToDollar)
  t.equals(amtInUSD.toString(), '583.7409 USD')
  let amtBackInBTC = amtInUSD.to(bitcoin.BTC, dollarToBitcoin)
  t.equals(amtBackInBTC.toString(), '1.53 BTC')

  t.end()
})

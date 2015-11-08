import test from 'tape'
import NumberUnit from '../'
import { bitcoin, distanceSI } from './_fixtures'

test('factory create method with number input', function (t) {
  // very verbose
  let amount1 = NumberUnit.create(1.53, bitcoin.BTC)
  t.equals(amount1.unitName, 'BTC', 'verify unit is BTC')
  t.equals(amount1.toNumber(), 1.53, 'verify amount 1.53')

  // more concise
  let amount2 = bitcoin.BTC(1.53)
  t.equals(amount2.unitName, 'BTC', 'verify unit is BTC')
  t.equals(amount2.toNumber(), 1.53, 'verify amount 1.53')

  let distance1 = distanceSI.m(84)
  t.equals(distance1.unitName, 'm', 'verify unit is m')
  t.equals(distance1.toNumber(), 84, 'verify amount 84')

  t.end()
})

test('create method with string input', function (t) {
  // more concise
  let amount2 = bitcoin.BTC('1.53')
  t.equals(amount2.unitName, 'BTC', 'verify unit is BTC')
  t.equals(amount2.toNumber(), 1.53, 'verify amount 1.53')

  let distance1 = distanceSI.m('84')
  t.equals(distance1.unitName, 'm', 'verify unit is m')
  t.equals(distance1.toNumber(), 84, 'verify amount 84')

  t.end()
})

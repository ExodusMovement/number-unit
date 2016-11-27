import test from 'tape-catch'
import { bitcoin } from './_fixtures'
import NumberUnit from '../'

test('should not error out on significant figures', function (t) {
  let isNumberUnit = function (x) {
    return x !== undefined && x !== null && x.constructor && x.constructor.name === NumberUnit.name
  }

  let b1 = null
  try {
    b1 = bitcoin.BTC(3516.2695380859077) // 17 significant figures
  } catch (e) {
  }
  t.ok(isNumberUnit(b1), 'Creation of NumberUnit with number 3516.2695380859077 was successful')

  let b2 = null
  try {
    b2 = bitcoin.BTC(3516.26953808590) // 15 significant figures
  } catch (e) {
  }
  t.ok(isNumberUnit(b2), 'Creation of NumberUnit with number 3516.26953808590 was successful')

  let b3 = null
  try {
    b3 = bitcoin.BTC(351626953808590.7) // 16 significant figures
  } catch (e) {
  }
  t.ok(isNumberUnit(b3), 'Creation of NumberUnit with number 351626953808590.7 was successful')

  let b4 = null
  try {
    b4 = bitcoin.BTC(35162695380859.1) // 15 significant figures
  } catch (e) {
  }
  t.ok(isNumberUnit(b4), 'Creation of NumberUnit with number 35162695380859.1 was successful')

  t.end()
})

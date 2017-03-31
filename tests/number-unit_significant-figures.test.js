import test from 'tape-catch'
import { bitcoin } from './_fixtures'

test('should not error out on significant figures', function (t) {
  t.doesNotThrow(function () {
    bitcoin.BTC(3516.2695380859077) // 17 significant figures
  }, 'Creation of NumberUnit with number 3516.2695380859077 should not throw an error')

  t.doesNotThrow(function () {
    bitcoin.BTC(3516.26953808590) // 15 significant figures
  }, 'Creation of NumberUnit with number 3516.26953808590 should not throw an error')

  t.doesNotThrow(function () {
    bitcoin.BTC(351626953808590.7) // 16 significant figures
  }, 'Creation of NumberUnit with number 351626953808590.7 should not throw an error')

  t.doesNotThrow(function () {
    bitcoin.BTC(35162695380859.1) // 15 significant figures
  }, 'Creation of NumberUnit with number 35162695380859.1 should not throw an error')

  t.end()
})

import test from 'tape-catch'
import { bitcoin } from './_fixtures'

test('to() other units', function (t) {
  let b1 = bitcoin.BTC(1.53)

  let b2 = b1.to(bitcoin.bits)
  let b3 = b1.to('bits')

  t.equals(b2.toString(), '1530000 bits', 'number w/unit string')
  t.equals(b3.toString(), '1530000 bits', 'number w/unit string')

  t.end()
})

test('to() when undefined or null passed', function (t) {
  let b1 = bitcoin.BTC(1.53)

  t.throws(() => b1.to(null))

  t.end()
})

test('toString() with unit parameter', function (t) {
  let b1 = bitcoin.BTC(1.53)

  t.equals(b1.toString(), '1.53 BTC', 'toString() w/ no param')
  t.equals(b1.toString({ unit: false }), '1.53', 'toString() w/ unit param false')
  t.equals(b1.toString({ unit: true }), '1.53 BTC', 'toString() w/ unit param true')

  t.end()
})

test('toString() with format parameter', function (t) {
  let b1 = bitcoin.BTC(1.53)

  t.equals(b1.toString({ format: (value, unit) => unit + ' ' + value }), 'BTC 1.53', 'reverse unit & value')

  t.end()
})

test('toNumber()', function (t) {
  let b1 = bitcoin.BTC(1.53)

  t.equals(b1.toNumber(), 1.53)
  t.equals(b1.to('bits').toNumber(), 1530000)

  t.end()
})

import test from 'tape-catch'
import { bitcoin } from './_fixtures'

test('toHex()', function (t) {
  let testValues = [
    [45.45, '4046b9999999999a'],
    [-3.2, 'c00999999999999a'],
    [15, '402e000000000000'],
    [16, '4030000000000000'],
    [1.875, '3ffe000000000000'],
    [-2, 'c000000000000000'],
    [-0.1451, 'bfc292a305532618'],
    [-0.0000001451, 'be83799918f73a0c'],
    [-9814412657157, 'c2a1da3129040a00'],
    [-0, '8000000000000000'],
    [+0, '0000000000000000'],
    [+Infinity, '7ff0000000000000'],
    [-Infinity, 'fff0000000000000'],
    [NaN, '7fffffffffffffff']
  ]

  for (let i = 0; i < testValues.length; i++) {
    let value = testValues[i][0]
    let expected = testValues[i][1]
    t.equals(bitcoin.BTC(value).toHex(), expected, 'toHex() of ' + value + ' should be ' + expected)
  }

  t.end()
})

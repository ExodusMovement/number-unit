import test from 'tape'
import { bitcoin } from './fixtures'
import NumberUnit from '../'

test('number-unit: isNumberUnit()', function (t) {
  const b0 = bitcoin.ZERO
  t.ok(NumberUnit.isNumberUnit(b0), 'instance of NumberUnit should be true')
  t.notOk(NumberUnit.isNumberUnit(34), 'number should be false')

  t.end()
})

const NumberUnit = require('../')
const test = require('tape-catch')

test('verify NumberUnit is exported', function (t) {
  t.plan(1)

  t.ok(NumberUnit, 'NumberUnit exported as default')

  t.end()
})

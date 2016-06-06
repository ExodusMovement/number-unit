const NumberUnit = require('../').default // <--- NOTICE default
const test = require('tape-catch')

test('verify NumberUnit is exported', function (t) {
  t.plan(1)

  t.strictEqual(typeof NumberUnit.create, 'function', 'NumberUnit exported as default')

  t.end()
})

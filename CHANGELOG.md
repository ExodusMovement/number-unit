Unreleased
-----------

### Fixed

- throw if an error is less than `MIN_SAFE_INTEGER` or greater than `MAX_SAFE_INTEGER`. [#11], [#15]


0.11.0 / 2016-06-06
-------------------
### Added
- Officially added support for Node v0.10, Node v0.12

### Breaking
- Upgraded to Babel 6, this:

```js
var NumberUnit = require('number-unit')
```

becomes:

```js
var NumberUnit = require('number-unit').default
```

- `valueOf()` calls `toDefault()` before converting to a `Number`. This normalizes the types so that:

```js
let b2 = dollar.USD(2)
let b3 = dollar.cents(100)

assert(b2 > b3, '2 USD > 100 cents')
```



0.10.0 / 2016-03-11
-------------------
- added `isZero()`

0.9.0 / 2016-03-09
------------------
- added `valueOf()`
- added `clampLowerZero()`

0.8.0 / 2015-12-21
------------------
- added `lte()`
- added `gte()`

0.7.0 / 2015-12-18
------------------
- added `lt()` for less than comparisons

0.6.1 / 2015-11-18
------------------
- added ability for factory unit creator functions to take as input a NumberUnit

Example:
```js
let amount2 = bitcoin.BTC('1.53')
console.log(amount2.toString()) // => '1.53 BTC'

let amount3 = bitcoin.bits(amount2) // <--- can do this now
console.log(amount3.toString()) // '1530000 bits'
```

0.6.0 / 2015-11-08
------------------
- switched `decimal.js` for `bignumber.js`

0.5.0 / 2015-11-08
------------------
- initial PUBLIC release (been in production for awhile in private apps)

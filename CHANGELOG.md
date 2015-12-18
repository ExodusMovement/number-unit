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

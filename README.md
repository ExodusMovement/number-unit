Number (with) Unit
==================

[![build status](https://api.travis-ci.org/jprichardson/number-unit.svg)](http://travis-ci.org/jprichardson/number-unit)

A JavaScript component to handle arbitrary precision numbers with units.


Why?
----

A number without context (unit) is meaningless. Even more so in the realm of
computers. Computers rely on input, usually from humans, to be precise. Humans are prone to error.
This library helps to remove that error.

Consider these two famous incidents...

1. **Mars Surveyor '98 Orbiter**

From https://en.wikipedia.org/wiki/Mars_Climate_Orbiter:

> However, on September 23, 1999, communication with the spacecraft was lost as the spacecraft went into orbital insertion, due to ground-based computer software which produced output in non-SI units of pound-seconds (lbf s) instead of the metric units of newton-seconds (N s) specified in the contract between NASA and Lockheed. The spacecraft encountered Mars on a trajectory that brought it too close to the planet, causing it to pass through the upper atmosphere and disintegrate.

2. **Air Canada Flight 143**

From https://en.wikipedia.org/wiki/Gimli_Glider:

> ...ran out of fuel at an altitude of 12,500 metres (41,000 ft) MSL, about halfway through its flight originating in Montreal to Edmonton. The crew were able to glide the aircraft safely to an emergency landing at Gimli Industrial Park Airport, a former Royal Canadian Air Force base in Gimli, Manitoba.[1]

> The subsequent investigation revealed a combination of company failures and a chain of human errors that defeated built-in safeguards. Fuel loading was miscalculated because of a misunderstanding of the recently adopted metric system which replaced the imperial system.

---

If you're writing software that **handles people's money**, you can't afford to be wrong. **That's why
this library was built.**


Install
-------

    npm i --save number-unit


Usage
-----

**Quick example:**

```js
var UnitType = require('number-unit').UnitType

// create a UnitType first
var bitcoin = UnitType.create('bitcoin', { satoshis: 1, bits: 1e2, BTC: 1e8 })

// now create a NumberUnit
var amount1 = bitcoin.BTC(1.53)
var amount2 = bitcoin.bits(1530000)

console.log(amount1.toString()) // => 1.53 BTC
console.log(amount2.toString()) // => 1530000 bits

// compare numerical values
console.log(amount1.equals(amount2)) // => true
```


### Important Concepts to Know

1. You must use `UnitType.create()` to create a `UnitType()` to start working with
NumberUnits.

2. UnitTypes can be a type of other UnitTypes. For example, you may create
a `UnitType` named `distance`, and then want to create another named `distanceSI`
representing your desire to model [SI / Metric Units](https://en.wikipedia.org/wiki/International_System_of_Units).
Now you may want to create another named `distanceUS`, modeling
[United States customary units](https://en.wikipedia.org/wiki/United_States_customary_units). Since both
have `distance` has a parent type, you can convert between the two. This is the value
of parent types. As it wouldn't make sense to convert from distance to currency or something
lie that. See: (LINK TO FIXURES)



### NumberUnit


### Unit


### UnitType


### ConversionUnit

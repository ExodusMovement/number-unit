import { ok } from 'assert'
import isNumberUnit from './is-number-unit'

export default function conversion (numberUnit1, numberUnit2) {
  ok(isNumberUnit(numberUnit1) && isNumberUnit(numberUnit2), 'Must pass in an instance of NumberUnit for both parameters.')
  const ut1 = numberUnit1.unitType
  const ut2 = numberUnit2.unitType

  let converter = function converter (someNumberUnit) {
    ok(isNumberUnit(someNumberUnit), 'Must pass in an instance of a NumberUnit to convert.')
    const ut = someNumberUnit.unitType
    ok(ut === ut1 || ut === ut2, `${ut.path} should be either ${ut1.path} or ${ut2.path}`)

    // means we have 1, want 2
    if (ut === ut1) {
      // convert someNumberUnit into the same unit as numberUnit1
      // e.g. someNumberUnit is 'km', but numberUnit1 is 'm'
      let normalizeNum = someNumberUnit.to(numberUnit1.unitName)
      let newNumber = normalizeNum._number.times(numberUnit2._number).div(numberUnit1._number)
      return ut2[numberUnit2.unitName](newNumber)
    } else if (ut === ut2) { // means we have 2, want 1
      let normalizeNum = someNumberUnit.to(numberUnit2.unitName)
      let newNumber = normalizeNum._number.times(numberUnit1._number).div(numberUnit2._number)
      return ut1[numberUnit1.unitName](newNumber)
    }
  }

  return converter
}

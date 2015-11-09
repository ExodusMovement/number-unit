import { ok, strictEqual } from 'assert'
import Decimal from 'bignumber.js'
import _isNumberUnit from './is-number-unit'
// import Unit from './unit'

export default class NumberUnit {
  static create (number, unit, options) {
    return new NumberUnit(number, unit, options)
  }

  // so you don't have to do instanceof and get bit by different included versions
  static isNumberUnit = _isNumberUnit

  static strict = false

  constructor (number, unit, { strict } = {}) {
    // assert(unit instanceof Unit, 'Must specify type of Unit.')
    this._number = new Decimal(number)
    this.unit = unit

    // TODO: make these getters
    this.unitType = unit.unitType
    this.baseUnit = unit.unitType.baseUnit
    this.defaultUnit = unit.unitType.defaultUnit
    this.rootUnitType = unit.unitType.rootUnitType
    this.unitName = this.unit.unitName

    // default to static, which is false
    this.strict = strict == null ? NumberUnit.strict : strict
    // this._baseNumber = this._number.times(unit.multiplier)
  }

  abs () {
    return new NumberUnit(this._number.abs(), this.unit, { strict: this.strict })
  }

  add (number) {
    number = this._coerceToNumberUnit(number)
    let base = number.toBase()
    let thisBase = this.toBase()
    let sumBase = base._number.plus(thisBase._number)
    return new NumberUnit(sumBase, this.baseUnit).to(this.unit)
  }

  equals (number) {
    let base = number.toBase()
    let thisBase = this.toBase()
    return base._number.equals(thisBase._number)
  }

  gt (number) {
    let base = number.toBase()
    let thisBase = this.toBase()
    return thisBase._number.gt(base._number)
  }

  negate () {
    return new NumberUnit(this._number.neg(), this.unit, { strict: this.strict })
  }

  subtract (number) {
    number = this._coerceToNumberUnit(number)
    let base = number.toBase()
    let thisBase = this.toBase()
    let sumBase = thisBase._number.minus(base._number)
    return new NumberUnit(sumBase, this.baseUnit).to(this.unit)
  }

  clone () {
    return new NumberUnit(this._number, this.unit)
  }

  inspect () {
    return `<NumberUnit: ${this.toString()} >`
  }

  toBase () {
    // already is base
    if (this.unit.multiplier === 1) {
      return this.clone()
    }

    let newNumber = this._number.times(this.unit.multiplier)
    return new NumberUnit(newNumber, this.baseUnit)
  }

  toDefault () {
    return this.to(this.defaultUnit)
  }

  to (unit, conversionUnit) {
    // e.g. 'bits'
    if (typeof unit === 'string') {
      unit = this.unitType.units[unit]
    }
    ok(typeof unit === 'string' || typeof unit === 'function', 'Unit must be either a string or a function from UnitType.')

    strictEqual(this.rootUnitType, unit.rootUnitType, `Incompatible root unit types: ${this.rootUnitType.label} and ${unit.rootUnitType.label}`)

    if (this.unit.unitType !== unit.unitType) {
      if (!conversionUnit) throw new Error('Incompatible unit types. Must specify a conversion.')

      // deprecated
      if (typeof conversionUnit !== 'function') {
        if (this.unitType !== conversionUnit.from.unitType) throw new Error('Conversion unit from is of different type.')
        let normalizeNum = this.to(this.unitType[conversionUnit.fromUnit])
        let newNumber = normalizeNum._number.times(conversionUnit.toValue).div(conversionUnit.fromValue)
        return new NumberUnit(newNumber, conversionUnit.to.unitType[conversionUnit.toUnit])
      } else {
        // new way
        return conversionUnit(this)
      }
    } else { // same unitType e.g. BTC to satoshis
      var base = this.toBase()
      let newNumber = base._number.div(unit.multiplier)
      return new NumberUnit(newNumber, unit)
    }
  }

  // this is only here to prevent JSON stringify circular error
  // you should probably use toString() in conjunction with parse()
  // a corresponding fromJSON probably won't ever be implemented
  toJSON () {
    return {
      value: this._number.toString(),
      unit: this.unitName,
      unitType: this.unitType.path,
      type: 'NumberUnit'
    }
  }

  toNumber () {
    return this._number.toNumber()
  }

  toString ({ unit = true, format = undefined } = {}) {
    if (!format) {
      return this._number.toString() + (unit ? ' ' + this.unitName : '')
    } else {
      return format(this._number, this.unit)
    }
  }

  get isNegative () {
    return this._number.isNegative()
  }

  // convert 'number' / 'string' to NumberUnit
  _coerceToNumberUnit (number) {
    let isNU = NumberUnit.isNumberUnit(number)
    if (!isNU && this.strict) throw new Error("Strict mode: can't perform operation on anything other than instance of NumberUnit")
    if (isNU) return number
    else return new NumberUnit(number, this.unit)
  }
}

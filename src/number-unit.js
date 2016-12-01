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
    let maxSafeInteger = new Decimal(Number.MAX_SAFE_INTEGER !== undefined ? Number.MAX_SAFE_INTEGER : 9007199254740991)
    let minSafeInteger = new Decimal(Number.MIN_SAFE_INTEGER !== undefined ? Number.MIN_SAFE_INTEGER : -9007199254740991)
    if (this._number.greaterThan(maxSafeInteger) || this._number.lessThan(minSafeInteger)) {
      throw new Error('Number cannot be larger than ' + Number.MAX_SAFE_INTEGER + ' or less than ' + Number.MIN_SAFE_INTEGER)
    }
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

  clampLowerZero () {
    const zero = new NumberUnit(0, this.unit)
    if (this.gte(zero)) return this
    else return zero
  }

  clone () {
    return new NumberUnit(this._number, this.unit)
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

  gte (number) {
    let base = number.toBase()
    let thisBase = this.toBase()
    return thisBase._number.gte(base._number)
  }

  inspect () {
    return `<NumberUnit: ${this.toString()} >`
  }

  isZero () {
    return this.toNumber() === 0
  }

  lt (number) {
    let base = number.toBase()
    let thisBase = this.toBase()
    return thisBase._number.lt(base._number)
  }

  lte (number) {
    let base = number.toBase()
    let thisBase = this.toBase()
    return thisBase._number.lte(base._number)
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

  // with 'conversionUnit' usage is deprecated
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

  // TODO: `format` is undocumented, consider if passing `this._number` is correct. Probably should just pass `this`
  toString ({ unit = true, format = undefined } = {}) {
    if (!format) {
      return this._number.toString() + (unit ? ' ' + this.unitName : '')
    } else {
      return format(this._number, this.unit)
    }
  }

  toBinary () {
    let string = this._number.toString() // eg: -3.2
    let isNegative = this._number.isNegative()

    let bias = 1023
    let exponentBitsLength = 11
    let exponentBits = ''
    let mantissaBitsLength = 52
    let mantissaBits = ''
    let ieee754Binary = ''

    // remove negative sign
    if (string.substr(0, 1) === '-') {
      string = string.substr(1)
    }

    // BigNumber's toString possibly return NaN or Infinity
    if (['NaN', 'Infinity'].indexOf(string) !== -1) {
      exponentBits = ''
      for (let i = 0; i < exponentBitsLength; i++) {
        exponentBits += '1'
      }
      mantissaBits = ''
      for (let i = 0; i < mantissaBitsLength; i++) {
        mantissaBits += string === 'NaN' ? '1' : '0'
      }

      ieee754Binary = (isNegative ? '1' : '0') + exponentBits + mantissaBits
      return ieee754Binary
    }

    let dotIndex = string.indexOf('.')
    let binaryString = ''
    if (dotIndex === -1) {
      binaryString = (+string).toString(2)
    } else {
      let left = (+string.substr(0, dotIndex)).toString(2)
      let right = ''
      let numerator = +string.substr(dotIndex + 1)
      let tens = Math.pow(10, ('' + numerator).length)
      for (let i = 0; i < mantissaBitsLength; i++) {
        numerator *= 2
        if (numerator > tens) {
          numerator -= tens
          right += '1'
        } else {
          right += '0'
        }
        tens = Math.pow(10, ('' + numerator).length)
      }
      binaryString = left + '.' + right
    }

    let firstOneIndex = binaryString.indexOf('1')

    if (firstOneIndex === -1) {
      exponentBits = ''
      for (let i = 0; i < exponentBitsLength; i++) {
        exponentBits += '0'
      }
      mantissaBits = ''
      for (let i = 0; i < mantissaBitsLength; i++) {
        mantissaBits += '0'
      }

      ieee754Binary = (isNegative ? '1' : '0') + exponentBits + mantissaBits
      return ieee754Binary
    }

    let floatingPointPosition = binaryString.indexOf('.') === -1 ? binaryString.length : binaryString.indexOf('.')
    let exponent = floatingPointPosition - firstOneIndex - (floatingPointPosition > firstOneIndex ? 1 : 0)

    exponentBits = (+(+bias + +exponent)).toString(2)
    while (exponentBits.length < exponentBitsLength) {
      exponentBits = '0' + exponentBits
    }
    exponentBits = exponentBits.substr(0, exponentBitsLength)

    for (let i = firstOneIndex + 1; i < binaryString.length; i++) {
      let bit = binaryString.substr(i, 1)
      if (bit !== '1' && bit !== '0') {
        continue
      }
      mantissaBits += bit
    }
    while (mantissaBits.length < mantissaBitsLength) {
      mantissaBits += '0'
    }
    mantissaBits = mantissaBits.substr(0, mantissaBitsLength)

    ieee754Binary = (isNegative ? '1' : '0') + exponentBits + mantissaBits
    return ieee754Binary
  }

  toHex () {
    let ieee754Binary = this.toBinary()

    let ieee754Hex = ''
    for (let i = 0; i < (ieee754Binary.length / 16); i++) {
      let chunk = ieee754Binary.substr(i * 16, 16)
      let hex = parseInt(chunk, 2).toString(16)
      while (hex.length < 4) {
        hex = '0' + hex
      }
      ieee754Hex += hex
    }

    return ieee754Hex
  }

  valueOf () {
    return this.toDefault().toNumber()
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

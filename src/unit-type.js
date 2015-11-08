import assert from 'assert'
import * as Unit from './unit'
import NumberUnit from './number-unit'

export default class UnitType {
  static create (label, parent, definitions, defaultUnit) {
    return new UnitType(label, parent, definitions, defaultUnit)
  }

  constructor (label, parent, definitions, defaultUnit) {
    assert(label, 'UnitType:constructor(): Must specify a unit type label.')
    assert(parent ? parent instanceof UnitType : true, 'UnitType:constructor(): Parent unit must be of type Unit or null.')
    this.label = label
    this.path = parent ? parent.path + '/' + label : label
    this.rootUnitType = parent ? parent.rootUnitType : this

    if (definitions) {
      assert(defaultUnit, 'if unit definitions are defined, a defaultUnit must be defined')
      this._applyDefinitions(definitions, defaultUnit)
    }
  }

  _applyDefinitions (definitions, defaultUnit) {
    this.units = {}

    Object.keys(definitions).forEach((key) => {
      this.units[key] = Unit.create(this, key, definitions[key])
      // merge units with `this`
      this[key] = this.units[key]
      /* let keyRenamed = key
      // check if lowercase
      if (key[0].match(/a-z/)) keyRenamed = key[0].toUpperCase() + key.slice(1)
      this['to' + keyRenamed] = (decimalNumber, )*/
    })

    let baseUnits = Object.keys(this.units).filter((unit) => this.units[unit].multiplier === 1)
    this.baseUnit = baseUnits ? baseUnits[0] : null
    assert(this.baseUnit, 'At least one unit must have a multiplier of one.')
    // set base unit to actual object instead of string
    this.baseUnit = this.units[this.baseUnit]
    this.defaultUnit = this.units[defaultUnit]

    // defaultUnit passed, but doesn't match unit keys
    assert(this.defaultUnit, 'Incorrect default unit key set. Mispelling on default unit?')
  }

  inspect () {
    return this.toString()
  }

  parse (str) {
    assert.strictEqual(typeof str, 'string')
    let [amount, unit] = str.split(' ') // e.g. 100 bits or 150.30 USD
    assert(unit, 'Number unit string not proper format. Should be number and unit.')
    assert(this.units[unit], 'Unit not found.')
    return this.units[unit](amount)
  }

  toString () {
    return this.path
  }

  get ZERO () {
    return NumberUnit.create(0, this.defaultUnit)
  }
}

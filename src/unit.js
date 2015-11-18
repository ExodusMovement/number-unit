import NumberUnit from './number-unit'
import isNumberUnit from './is-number-unit'

export function create (unitType, name, multiplier) {
  let numberUnitCreator = (val) => {
    if (isNumberUnit(val)) {
      return val.to(numberUnitCreator)
    } else {
      return NumberUnit.create(val, numberUnitCreator)
    }
  }

  numberUnitCreator.unitName = name
  numberUnitCreator.multiplier = multiplier
  numberUnitCreator.unitType = unitType
  numberUnitCreator.rootUnitType = unitType.rootUnitType

  numberUnitCreator.toJSON = function () {
    return {
      unitName: numberUnitCreator.unitName,
      multiplier: numberUnitCreator.multiplier,
      unitType: numberUnitCreator.unitType.path,
      rootUnitType: numberUnitCreator.rootUnitType
    }
  }

  numberUnitCreator.inspect = function () {
    return numberUnitCreator.toJSON()
  }

  numberUnitCreator.toString = function () {
    return numberUnitCreator.unitName
  }

  return numberUnitCreator
}

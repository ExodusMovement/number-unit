import test from 'tape'
import { UnitType } from '..'

test.skip('when create() parent / abstract unit-type', function (t) {
  const distance = UnitType.create('distance')
  t.equals(distance.label, 'distance')
  t.equals(distance.path, distance.label, 'path === label when abstract UnitType')

  t.equals(distance.rootUnitType, distance, 'when topmost, rootUnitType is this')
  t.equals(distance.units, undefined, 'units is undefined when parent type')

  t.equals(distance.baseUnit, undefined, 'baseUnit undefined')
  t.equals(distance.defaultUnit, undefined, 'defaultUnit undefined')

  t.end()
})

test('create() child unit', function (t) {
  const distance = UnitType.create('distance')

  const distanceDefintions = {
    km: 1e3,
    m: 1,
    cm: 1e-2,
    mm: 1e-3,
    um: 1e-6,
    nm: 1e-9
  }
  const distanceSI = UnitType.create('distance-si', distance, distanceDefintions, 'm')

  t.equals(distanceSI.label, 'distance-si')
  t.equals(distanceSI.path, 'distance/distance-si', 'distance-si path should be "distance/distance-si"')
  t.equals(distanceSI.rootUnitType, distance, 'rootUnitType is distance')

  const unitNames = Object.keys(distanceSI.units)
  t.same(unitNames, ['km', 'm', 'cm', 'mm', 'um', 'nm'])
  t.true(unitNames.every(unitName => typeof distanceSI.units[unitName] === 'function'), 'verify every unit is a factory function')

  let distDef = {}
  Object.keys(distanceSI.units).forEach((unitName) => {
    distDef[unitName] = distanceSI.units[unitName].multiplier
  })
  t.same(distanceDefintions, distDef)

  t.equals(distanceSI.baseUnit.unitName, 'm', 'distance (SI) baseUnit is "m"')
  t.equals(distanceSI.baseUnit.multiplier, 1, 'distance (SI) baseUnit multiplier is 1')
  t.equals(typeof distanceSI.baseUnit, 'function', 'baseUnit is a function')

  t.equals(distanceSI.defaultUnit.unitName, 'm', 'distance (SI) defaultUnit is "m"')
  t.equals(distanceSI.defaultUnit.multiplier, 1, 'distance (SI) defaultUnit multiplier is 1')
  t.equals(typeof distanceSI.defaultUnit, 'function', 'defaultUnit is a function')

  t.end()
})

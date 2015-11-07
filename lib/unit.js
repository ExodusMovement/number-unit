'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.create = create;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _numberUnit = require('./number-unit');

var _numberUnit2 = _interopRequireDefault(_numberUnit);

function create(unitType, name, multiplier) {
  var numberUnitCreator = function numberUnitCreator(val) {
    return _numberUnit2['default'].create(val, numberUnitCreator);
  };

  numberUnitCreator.unitName = name;
  numberUnitCreator.multiplier = multiplier;
  numberUnitCreator.unitType = unitType;
  numberUnitCreator.rootUnitType = unitType.rootUnitType;

  numberUnitCreator.toJSON = function () {
    return {
      unitName: numberUnitCreator.unitName,
      multiplier: numberUnitCreator.multiplier,
      unitType: numberUnitCreator.unitType.path,
      rootUnitType: numberUnitCreator.rootUnitType
    };
  };

  numberUnitCreator.inspect = function () {
    return numberUnitCreator.toJSON();
  };

  numberUnitCreator.toString = function () {
    return numberUnitCreator.unitName;
  };

  return numberUnitCreator;
}
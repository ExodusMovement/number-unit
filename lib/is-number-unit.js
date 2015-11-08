'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = isNumberUnit;

function isNumberUnit(obj) {
  if (typeof obj !== 'object') return false;
  // duck type check
  return '_number' in obj && 'unit' in obj && 'unitType' in obj && 'baseUnit' in obj && 'rootUnitType' in obj;
}

module.exports = exports['default'];
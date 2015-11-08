'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = conversion;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _assert = require('assert');

var _isNumberUnit = require('./is-number-unit');

var _isNumberUnit2 = _interopRequireDefault(_isNumberUnit);

function conversion(numberUnit1, numberUnit2) {
  (0, _assert.ok)((0, _isNumberUnit2['default'])(numberUnit1) && (0, _isNumberUnit2['default'])(numberUnit2), 'Must pass in an instance of NumberUnit for both parameters.');
  var ut1 = numberUnit1.unitType;
  var ut2 = numberUnit2.unitType;

  var converter = function converter(someNumberUnit) {
    (0, _assert.ok)((0, _isNumberUnit2['default'])(someNumberUnit), 'Must pass in an instance of a NumberUnit to convert.');
    var ut = someNumberUnit.unitType;
    (0, _assert.ok)(ut === ut1 || ut === ut2, ut.path + ' should be either ' + ut1.path + ' or ' + ut2.path);

    // means we have 1, want 2
    if (ut === ut1) {
      // convert someNumberUnit into the same unit as numberUnit1
      // e.g. someNumberUnit is 'km', but numberUnit1 is 'm'
      var normalizeNum = someNumberUnit.to(numberUnit1.unitName);
      var newNumber = normalizeNum._number.times(numberUnit2._number).div(numberUnit1._number);
      return ut2[numberUnit2.unitName](newNumber);
    } else if (ut === ut2) {
      // means we have 2, want 1
      var normalizeNum = someNumberUnit.to(numberUnit2.unitName);
      var newNumber = normalizeNum._number.times(numberUnit1._number).div(numberUnit2._number);
      return ut1[numberUnit1.unitName](newNumber);
    }
  };

  return converter;
}

module.exports = exports['default'];
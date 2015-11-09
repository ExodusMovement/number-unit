'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _unit = require('./unit');

var Unit = _interopRequireWildcard(_unit);

var UnitType = (function () {
  _createClass(UnitType, null, [{
    key: 'create',
    value: function create(label, parent, definitions, defaultUnit) {
      return new UnitType(label, parent, definitions, defaultUnit);
    }
  }]);

  function UnitType(label, parent, definitions, defaultUnit) {
    _classCallCheck(this, UnitType);

    (0, _assert2['default'])(label, 'UnitType:constructor(): Must specify a unit type label.');
    (0, _assert2['default'])(parent ? parent instanceof UnitType : true, 'UnitType:constructor(): Parent unit must be of type Unit or null.');
    this.label = label;
    this.path = parent ? parent.path + '/' + label : label;
    this.rootUnitType = parent ? parent.rootUnitType : this;

    if (definitions) {
      (0, _assert2['default'])(defaultUnit, 'if unit definitions are defined, a defaultUnit must be defined');
      this._applyDefinitions(definitions, defaultUnit);
    }
  }

  _createClass(UnitType, [{
    key: '_applyDefinitions',
    value: function _applyDefinitions(definitions, defaultUnit) {
      var _this = this;

      this.units = {};

      Object.keys(definitions).forEach(function (key) {
        _this.units[key] = Unit.create(_this, key, definitions[key]);
        // merge units with `this`
        _this[key] = _this.units[key];
        /* let keyRenamed = key
        // check if lowercase
        if (key[0].match(/a-z/)) keyRenamed = key[0].toUpperCase() + key.slice(1)
        this['to' + keyRenamed] = (decimalNumber, )*/
      });

      var baseUnits = Object.keys(this.units).filter(function (unit) {
        return _this.units[unit].multiplier === 1;
      });
      this.baseUnit = baseUnits ? baseUnits[0] : null;
      (0, _assert2['default'])(this.baseUnit, 'At least one unit must have a multiplier of one.');
      // set base unit to actual object instead of string
      this.baseUnit = this.units[this.baseUnit];
      this.defaultUnit = this.units[defaultUnit];

      // defaultUnit passed, but doesn't match unit keys
      (0, _assert2['default'])(this.defaultUnit, 'Incorrect default unit key set. Mispelling on default unit?');
    }
  }, {
    key: 'inspect',
    value: function inspect() {
      return this.toString();
    }
  }, {
    key: 'parse',
    value: function parse(str) {
      _assert2['default'].strictEqual(typeof str, 'string');

      var _str$split = str.split(' ');

      var _str$split2 = _slicedToArray(_str$split, 2);

      var amount = _str$split2[0];
      var unit = _str$split2[1];
      // e.g. 100 bits or 150.30 USD
      (0, _assert2['default'])(unit, 'Number unit string not proper format. Should be number and unit.');
      (0, _assert2['default'])(this.units[unit], 'Unit not found.');
      return this.units[unit](amount);
    }
  }, {
    key: 'toString',
    value: function toString() {
      return this.path;
    }
  }, {
    key: 'ZERO',
    get: function get() {
      return this.defaultUnit(0);
    }
  }]);

  return UnitType;
})();

exports['default'] = UnitType;
module.exports = exports['default'];
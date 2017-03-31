'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _assert = require('assert');

var _bignumber = require('bignumber.js');

var _bignumber2 = _interopRequireDefault(_bignumber);

var _isNumberUnit2 = require('./is-number-unit');

var _isNumberUnit3 = _interopRequireDefault(_isNumberUnit2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// import Unit from './unit'

var NumberUnit = function () {
  _createClass(NumberUnit, null, [{
    key: 'create',
    value: function create(number, unit, options) {
      return new NumberUnit(number, unit, options);
    }

    // so you don't have to do instanceof and get bit by different included versions

  }]);

  function NumberUnit(number, unit) {
    var _ref = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    var strict = _ref.strict;

    _classCallCheck(this, NumberUnit);

    // assert(unit instanceof Unit, 'Must specify type of Unit.')
    this._number = new _bignumber2.default(number);
    var maxSafeInteger = new _bignumber2.default(Number.MAX_SAFE_INTEGER !== undefined ? Number.MAX_SAFE_INTEGER : 9007199254740991);
    var minSafeInteger = new _bignumber2.default(Number.MIN_SAFE_INTEGER !== undefined ? Number.MIN_SAFE_INTEGER : -9007199254740991);
    if (this._number.greaterThan(maxSafeInteger) || this._number.lessThan(minSafeInteger)) {
      throw new Error('Number cannot be larger than ' + Number.MAX_SAFE_INTEGER + ' or less than ' + Number.MIN_SAFE_INTEGER);
    }
    this.unit = unit;

    // TODO: make these getters
    this.unitType = unit.unitType;
    this.baseUnit = unit.unitType.baseUnit;
    this.defaultUnit = unit.unitType.defaultUnit;
    this.rootUnitType = unit.unitType.rootUnitType;
    this.unitName = this.unit.unitName;

    // default to static, which is false
    this.strict = strict == null ? NumberUnit.strict : strict;
    // this._baseNumber = this._number.times(unit.multiplier)
  }

  _createClass(NumberUnit, [{
    key: 'abs',
    value: function abs() {
      return new NumberUnit(this._number.abs(), this.unit, { strict: this.strict });
    }
  }, {
    key: 'add',
    value: function add(number) {
      number = this._coerceToNumberUnit(number);
      var base = number.toBase();
      var thisBase = this.toBase();
      var sumBase = base._number.plus(thisBase._number);
      return new NumberUnit(sumBase, this.baseUnit).to(this.unit);
    }
  }, {
    key: 'clampLowerZero',
    value: function clampLowerZero() {
      var zero = new NumberUnit(0, this.unit);
      if (this.gte(zero)) return this;else return zero;
    }
  }, {
    key: 'clone',
    value: function clone() {
      return new NumberUnit(this._number, this.unit);
    }
  }, {
    key: 'equals',
    value: function equals(number) {
      var base = number.toBase();
      var thisBase = this.toBase();
      return base._number.equals(thisBase._number);
    }
  }, {
    key: 'gt',
    value: function gt(number) {
      var base = number.toBase();
      var thisBase = this.toBase();
      return thisBase._number.gt(base._number);
    }
  }, {
    key: 'gte',
    value: function gte(number) {
      var base = number.toBase();
      var thisBase = this.toBase();
      return thisBase._number.gte(base._number);
    }
  }, {
    key: 'inspect',
    value: function inspect() {
      return '<NumberUnit: ' + this.toString() + ' >';
    }
  }, {
    key: 'isZero',
    value: function isZero() {
      return this.toNumber() === 0;
    }
  }, {
    key: 'lt',
    value: function lt(number) {
      var base = number.toBase();
      var thisBase = this.toBase();
      return thisBase._number.lt(base._number);
    }
  }, {
    key: 'lte',
    value: function lte(number) {
      var base = number.toBase();
      var thisBase = this.toBase();
      return thisBase._number.lte(base._number);
    }
  }, {
    key: 'negate',
    value: function negate() {
      return new NumberUnit(this._number.neg(), this.unit, { strict: this.strict });
    }
  }, {
    key: 'subtract',
    value: function subtract(number) {
      number = this._coerceToNumberUnit(number);
      var base = number.toBase();
      var thisBase = this.toBase();
      var sumBase = thisBase._number.minus(base._number);
      return new NumberUnit(sumBase, this.baseUnit).to(this.unit);
    }
  }, {
    key: 'toBase',
    value: function toBase() {
      // already is base
      if (this.unit.multiplier === 1) {
        return this.clone();
      }

      var newNumber = this._number.times(this.unit.multiplier);
      return new NumberUnit(newNumber, this.baseUnit);
    }
  }, {
    key: 'toDefault',
    value: function toDefault() {
      return this.to(this.defaultUnit);
    }

    // with 'conversionUnit' usage is deprecated

  }, {
    key: 'to',
    value: function to(unit, conversionUnit) {
      // e.g. 'bits'
      if (typeof unit === 'string') {
        unit = this.unitType.units[unit];
      }
      (0, _assert.ok)(typeof unit === 'string' || typeof unit === 'function', 'Unit must be either a string or a function from UnitType.');

      (0, _assert.strictEqual)(this.rootUnitType, unit.rootUnitType, 'Incompatible root unit types: ' + this.rootUnitType.label + ' and ' + unit.rootUnitType.label);

      if (this.unit.unitType !== unit.unitType) {
        if (!conversionUnit) throw new Error('Incompatible unit types. Must specify a conversion.');

        // deprecated
        if (typeof conversionUnit !== 'function') {
          if (this.unitType !== conversionUnit.from.unitType) throw new Error('Conversion unit from is of different type.');
          var normalizeNum = this.to(this.unitType[conversionUnit.fromUnit]);
          var newNumber = normalizeNum._number.times(conversionUnit.toValue).div(conversionUnit.fromValue);
          return new NumberUnit(newNumber, conversionUnit.to.unitType[conversionUnit.toUnit]);
        } else {
          // new way
          return conversionUnit(this);
        }
      } else {
        // same unitType e.g. BTC to satoshis
        var base = this.toBase();
        var _newNumber = base._number.div(unit.multiplier);
        return new NumberUnit(_newNumber, unit);
      }
    }

    // this is only here to prevent JSON stringify circular error
    // you should probably use toString() in conjunction with parse()
    // a corresponding fromJSON probably won't ever be implemented

  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        value: this._number.toString(),
        unit: this.unitName,
        unitType: this.unitType.path,
        type: 'NumberUnit'
      };
    }
  }, {
    key: 'toNumber',
    value: function toNumber() {
      return this._number.toNumber();
    }

    // TODO: `format` is undocumented, consider if passing `this._number` is correct. Probably should just pass `this`

  }, {
    key: 'toString',
    value: function toString() {
      var _ref2 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      var _ref2$unit = _ref2.unit;
      var unit = _ref2$unit === undefined ? true : _ref2$unit;
      var _ref2$format = _ref2.format;
      var format = _ref2$format === undefined ? undefined : _ref2$format;

      if (!format) {
        return this._number.toString() + (unit ? ' ' + this.unitName : '');
      } else {
        return format(this._number, this.unit);
      }
    }
  }, {
    key: 'valueOf',
    value: function valueOf() {
      return this.toDefault().toNumber();
    }
  }, {
    key: '_coerceToNumberUnit',


    // convert 'number' / 'string' to NumberUnit
    value: function _coerceToNumberUnit(number) {
      var isNU = NumberUnit.isNumberUnit(number);
      if (!isNU && this.strict) throw new Error("Strict mode: can't perform operation on anything other than instance of NumberUnit");
      if (isNU) return number;else return new NumberUnit(number, this.unit);
    }
  }, {
    key: 'isNegative',
    get: function get() {
      return this._number.isNegative();
    }
  }]);

  return NumberUnit;
}();

NumberUnit.isNumberUnit = _isNumberUnit3.default;
NumberUnit.strict = false;
exports.default = NumberUnit;
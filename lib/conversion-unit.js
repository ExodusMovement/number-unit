'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _clone = require('clone');

var _clone2 = _interopRequireDefault(_clone);

// DEPRECATED

var ConversionUnit = (function () {
  _createClass(ConversionUnit, null, [{
    key: 'create',
    value: function create(args) {
      if (args.from && args.to) {
        return new ConversionUnit(args);
      } else {}
    }
  }]);

  function ConversionUnit(_ref) {
    var from = _ref.from;
    var to = _ref.to;

    _classCallCheck(this, ConversionUnit);

    this.from = from;
    this.to = to;
    this._parse('from');
    this._parse('to');
  }

  _createClass(ConversionUnit, [{
    key: 'invert',
    value: function invert() {
      return new ConversionUnit({ from: this.to, to: this.from });
    }

    // awkward name for this method, TODO: come up with something better
  }, {
    key: '_parse',
    value: function _parse(p) {
      var o = (0, _clone2['default'])(this[p]);
      delete o.unitType;
      // if object has more than 'unitType' and 'unit', this may fail. TODO: make more robust
      var unit = Object.keys(o)[0];
      this[p + 'Unit'] = unit;
      this[p + 'Value'] = o[unit];
    }
  }]);

  return ConversionUnit;
})();

exports['default'] = ConversionUnit;
module.exports = exports['default'];
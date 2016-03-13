'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _createProperty = require('./createProperty');

var _createProperty2 = _interopRequireDefault(_createProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FrozenObject = function () {
  function FrozenObject(source) {
    _classCallCheck(this, FrozenObject);

    var properties = Object.keys(source).reduce(function (acc, key) {
      acc[key] = (0, _createProperty2.default)(source[key]);
      return acc;
    }, {});
    Object.defineProperties(this, properties);
    Object.defineProperty(this, '__source__', {
      value: source,
      enumberable: false
    });
    Object.freeze(this);
  }

  _createClass(FrozenObject, [{
    key: 'merge',
    value: function merge() {
      var args = Array.prototype.concat.apply([this.__source__], arguments);
      args.unshift({});
      var target = Object.assign.apply(null, args);
      return new FrozenObject(target);
    }
  }, {
    key: 'delete',
    value: function _delete(key) {
      var target = Object.assign({}, this.__source__);
      delete target[key];
      return new FrozenObject(target);
    }
  }, {
    key: 'set',
    value: function set(key, value) {
      var update = {};
      update[key] = value;
      var target = Object.assign({}, this.__source__, update);
      return new FrozenObject(target);
    }
  }, {
    key: 'isFrozen',
    get: function get() {
      return true;
    }
  }]);

  return FrozenObject;
}();

exports.default = FrozenObject;
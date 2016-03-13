'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _createProperty = require('./createProperty');

var _createProperty2 = _interopRequireDefault(_createProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FrozenArray = function () {
  function FrozenArray(source) {
    _classCallCheck(this, FrozenArray);

    var sourceProps = source.reduce(function (acc, value, index) {
      acc[index] = (0, _createProperty2.default)(value);
      return acc;
    }, {});
    Object.defineProperties(this, sourceProps);
    Object.defineProperty(this, '__source__', {
      value: source,
      enumberable: false
    });
    Object.freeze(this);
  }

  _createClass(FrozenArray, [{
    key: 'concat',
    value: function concat(arr) {
      var output = this.__source__.concat(arr);
      return new FrozenArray(output);
    }
  }, {
    key: 'forEach',
    value: function forEach(callback) {
      return this.__source__.forEach(callback);
    }
  }, {
    key: 'map',
    value: function map(callback) {
      return new FrozenArray(this.__source__.map(callback));
    }
  }, {
    key: 'reduce',
    value: function reduce(callback, acc) {
      return this.__source__.reduce(callback, acc);
    }
  }, {
    key: 'filter',
    value: function filter(callback) {
      return new FrozenArray(this.__source__.filter(callback));
    }
  }, {
    key: 'push',
    value: function push() {
      var target = this.__source__.concat([]);
      target.push.apply(target, arguments);
      return new FrozenArray(target);
    }
  }, {
    key: 'pop',
    value: function pop() {
      var target = this.__source__.concat([]);
      target.pop();
      return new FrozenArray(target);
    }
  }, {
    key: 'shift',
    value: function shift() {
      var target = this.__source__.concat([]);
      target.shift();
      return new FrozenArray(target);
    }
  }, {
    key: 'unshift',
    value: function unshift() {
      var target = this.__source__.concat([]);
      target.unshift.apply(target, arguments);
      return new FrozenArray(target);
    }
  }, {
    key: 'join',
    value: function join(separator) {
      return this.__source__.join(separator);
    }
  }, {
    key: 'find',
    value: function find(callback, context) {
      return this.__source__.find(callback, context);
    }
  }, {
    key: 'findIndex',
    value: function findIndex(callback, context) {
      return this.__source__.findIndex(callback, context);
    }
  }, {
    key: 'indexOf',
    value: function indexOf(target) {
      return this.__source__.indexOf(target);
    }
  }, {
    key: 'reverse',
    value: function reverse() {
      var target = this.__source__.concat([]);
      target.reverse();
      return new FrozenArray(target);
    }
  }, {
    key: 'insertAt',
    value: function insertAt(position, value) {
      var target = this.__source__.concat([]);
      target.splice(position, 0, value);
      return new FrozenArray(target);
    }
  }, {
    key: 'deleteAt',
    value: function deleteAt(position) {
      var target = this.__source__.concat([]);
      target.splice(position, 1);
      return new FrozenArray(target);
    }
  }, {
    key: 'update',
    value: function update(position, value) {
      var target = this.__source__.concat([]);
      target.splice(position, 1, value);
      return new FrozenArray(target);
    }
  }, {
    key: 'length',
    get: function get() {
      return this.__source__.length;
    }
  }, {
    key: 'isFrozen',
    get: function get() {
      return true;
    }
  }]);

  return FrozenArray;
}();

exports.default = FrozenArray;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = deepFreeze;

var _freeze = require('./freeze');

var _freeze2 = _interopRequireDefault(_freeze);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function deepFreeze(source) {
  return (0, _freeze2.default)(recursiveFreeze(source));
}

var recursiveFreeze = function recursiveFreeze(source) {
  if ((0, _utils.isPlainObj)(source)) {
    return keyIterator(source, function (v) {
      return deepFreeze(v);
    });
  } else if (Array.isArray(source)) {
    return source.map(function (v) {
      return deepFreeze(v);
    });
  } else {
    return source;
  }
};

var keyIterator = function keyIterator(obj, fn) {
  return Object.keys(obj).reduce(function (acc, key) {
    acc[key] = fn(obj[key], key);
    return acc;
  }, {});
};
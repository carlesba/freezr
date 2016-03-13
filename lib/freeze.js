'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = freeze;

var _FrozenObject = require('./FrozenObject');

var _FrozenObject2 = _interopRequireDefault(_FrozenObject);

var _FrozenArray = require('./FrozenArray');

var _FrozenArray2 = _interopRequireDefault(_FrozenArray);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
  Create instances usint the constructors
*/
function freeze(source) {
  if ((0, _utils.isPlainObj)(source)) {
    return new _FrozenObject2.default(source);
  } else if (Array.isArray(source)) {
    return new _FrozenArray2.default(source);
  } else {
    return source;
  }
}
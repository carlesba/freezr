'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deepFreeze = exports.freeze = exports.FrozenArray = exports.FrozenObject = undefined;

var _FrozenObject = require('./FrozenObject');

var _FrozenObject2 = _interopRequireDefault(_FrozenObject);

var _FrozenArray = require('./FrozenArray');

var _FrozenArray2 = _interopRequireDefault(_FrozenArray);

var _freeze = require('./freeze');

var _freeze2 = _interopRequireDefault(_freeze);

var _deepFreeze = require('./deepFreeze');

var _deepFreeze2 = _interopRequireDefault(_deepFreeze);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.FrozenObject = _FrozenObject2.default;
exports.FrozenArray = _FrozenArray2.default;
exports.freeze = _freeze2.default;
exports.deepFreeze = _deepFreeze2.default;
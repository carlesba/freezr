"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var isPlainObj = exports.isPlainObj = function isPlainObj(value) {
  return value && (value.constructor === Object || value.constructor === undefined);
};
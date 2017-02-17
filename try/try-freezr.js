var freezr = require('../src')

console.log(':::::::::::::::Freezr:::::::::::::::')
console.log('use freeze or deepFreeze for creating you\'re immutable data')
window.freeze = freezr.freeze
window.deepFreeze = freezr.deepFreeze

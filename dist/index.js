
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./swap-sdk.cjs.production.min.js')
} else {
  module.exports = require('./swap-sdk.cjs.development.js')
}

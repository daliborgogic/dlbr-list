const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  authenticated: {
    type: Boolean,
    required: true,
    default: false
  }
})

/**
 * micro
 * Error when importing /home/dlbr/dev/dlbr-list/index.js
 * OverwriteModelError
 * Cannot overwrite `User` model once compiled.
*/
const overwrite = () => mongoose.models = {}
process.on('SIGNUSR2', overwrite)

module.exports = mongoose.model('User', schema)

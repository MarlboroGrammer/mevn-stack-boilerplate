var mongoose = require('mongoose')

var credentialsSchema = new mongoose.Schema({
  username: String,
  password: String,
  last_login: Date,
  role: {type: String, enum: ['Delegate', 'Admin'], default: 'Delegate'}
}, { collection: 'credentials' })

module.exports = mongoose.model('credentials', credentialsSchema)

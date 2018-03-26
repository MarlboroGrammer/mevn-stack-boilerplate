var mongoose = require('mongoose')
var delegate = require('./delegate.js')
var client = require('./client.js')
var costsSchema = new mongoose.Schema({
  date: Date,
  costType: {type: String, enum: ['Fuel', 'Phone bills', 'Toll gates', 'Accommodation', 'Lunch', 'Other']},
  totalATI: Number,
  description: String,
  client: client.schema,
  delegate: delegate.schema
}, { collection: 'costs' })

module.exports = mongoose.model('costs', costsSchema)

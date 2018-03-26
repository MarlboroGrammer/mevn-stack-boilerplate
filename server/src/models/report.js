var mongoose = require('mongoose')
var client = require('./client.js')
var delegate = require('./delegate')
var reportSchema = new mongoose.Schema({
  date: Date,
  type: {
    type: String,
    enum: ['Pharmacist', 'Doctor', 'Wholesaler', 'Hospital', 'Clinic']
  },
  entries: {
    questions: [String],
    answers: [String]
  },
  delegate: delegate.schema,
  client: client.schema
}, { collection: 'report' })

module.exports = mongoose.model('report', reportSchema)

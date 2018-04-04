var mongoose = require('mongoose')

var visitScheme = new mongoose.Schema({
  start_date: Date,
  end_date: Date,
  text: String,
  id: Number,
  status: {type: String, enum: ['Done', 'Not done']},
  visitType: {type: String, enum: ['Pharmacist', 'Doctor', 'Wholesaler']}
}, { collection: 'visit' })

module.exports.visit = mongoose.model('EvenT', visitScheme)

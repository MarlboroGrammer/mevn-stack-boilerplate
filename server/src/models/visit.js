var mongoose = require('mongoose')

var visitScheme = new mongoose.Schema({
  at: Date,
  objectif: String,
  status: {type: String, enum: ['Done', 'Not done']},
  visitType: {type: String, enum: ['Pharmacist', 'Doctor', 'Wholesaler']}
}, { collection: 'visit' })

module.exports = mongoose.model('visit', visitScheme)

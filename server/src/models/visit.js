var mongoose = require('mongoose')

var visitScheme = new mongoose.Schema({
  start_date: Date,
  end_date: Date,
  text: String,
  id: Number,
  Adresse: String,
  lat: Number,
  lng: Number,
  status: {type: String, enum: ['Done', 'Not done']},
  visitType: {type: String, enum: ['Pharmacist', 'Doctor', 'Wholesaler']},
  clientName: String,
  delegate: {type: mongoose.Schema.ObjectId, ref: 'delegate'}
}, { collection: 'visit' })

module.exports.visit = mongoose.model('EvenT', visitScheme)

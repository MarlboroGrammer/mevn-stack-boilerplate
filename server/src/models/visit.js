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
  visitType: {type: String, enum: ['Pharmacien', 'Docteur', 'Hospital', 'Clinique']}
}, { collection: 'visit' })

module.exports.visit = mongoose.model('EvenT', visitScheme)

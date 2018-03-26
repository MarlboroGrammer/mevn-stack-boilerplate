var mongoose = require('mongoose')
var visit = require('./visit.js')

var delegateSchema = new mongoose.Schema({
  name: String,
  surname: String,
  dateOfBirth: Date,
  CIN: Number,
  grossSalary: Number,
  carDeprication: Number,
  phoneNumber: Number,
  email: String,
  area: String,
  target: {type: String, enum: ['Pharmacist', 'Doctor', 'Wholesaler', 'Hospital', 'Clinic']},
  cycle: Number,
  visit: [visit.schema],
  credentials: {type: mongoose.Schema.ObjectId, ref: 'credentials'}
}, { collection: 'delegate' })

module.exports = mongoose.model('delegate', delegateSchema)

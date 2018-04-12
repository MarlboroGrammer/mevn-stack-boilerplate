var mongoose = require('mongoose')

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
  credentials: {type: mongoose.Schema.ObjectId, ref: 'credentials'}
}, { collection: 'delegate' })

module.exports = mongoose.model('delegate', delegateSchema)

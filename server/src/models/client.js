var mongoose = require('mongoose')

var clientSchema = new mongoose.Schema({
  location: {
    long: Number,
    latit: Number
  },
  area: String,
  address: {
    city: String,
    postalCode: Number
  },
  type: {type: String, enum: ['Pharmacist', 'Doctor', 'Wholesaler', 'Hospital', 'Clinic']},
  potential: {type: String, enum: ['A', 'B', 'C']},
  phoneNumber: Number,
  email: String
}, { collection: 'client' })

module.exports = mongoose.model('client', clientSchema)

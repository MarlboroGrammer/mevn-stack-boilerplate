var mongoose = require('mongoose')

var salesSchema = new mongoose.Schema({
  date: Date,
  amount: Number,
  type: {type: String, enum: ['Pharmacy', 'Wholesaler']},
  delegate: {type: mongoose.Schema.ObjectId, ref: 'delegate'},
  report: {type: mongoose.Schema.ObjectId, ref: 'report'}
}, { collection: 'sales' })

module.exports = mongoose.model('sales', salesSchema)

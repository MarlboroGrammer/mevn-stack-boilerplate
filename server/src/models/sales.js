var mongoose = require('mongoose')
var delegate = require('./delegate.js')
var client = require('./client.js')
var report = require('./report.js')

var salesSchema = new mongoose.Schema({
  date: Date,
  amount: Number,
  delegate: {type: mongoose.Schema.ObjectId, ref: 'delegate'},
  report: {type: mongoose.Schema.ObjectId, ref: 'report'}
}, { collection: 'sales' })

module.exports = mongoose.model('sales', salesSchema)

var mongoose = require('mongoose')
var delegate = require('./delegate.js')
var client = require('./client.js')
var orderSchema = new mongoose.Schema({
  date: Date,
  invoiceNo: Number,
  products: [{
    type: mongoose.Schema.ObjectId,
    ref: 'product',
    quantity: Number
  }],
  totalATI: Number,
  client: client.schema,
  delegate: delegate.schema
}, { collection: 'order' })

module.exports = mongoose.model('order', orderSchema)

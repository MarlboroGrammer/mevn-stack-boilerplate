var mongoose = require('mongoose')

var productSchema = new mongoose.Schema({
  name: String,
  contents: [String],
  form: String,
  WholesalerPriceATI: Number,
  SalePriceATI: Number,
  sampleValue: Number,
  instructions: String,
  posology: String
}, { collection: 'product' })

module.exports = mongoose.model('product', productSchema)

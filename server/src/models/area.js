var mongoose = require('mongoose')

var areaSchema = new mongoose.Schema({
  area: String,
  GSU: Number,
  cities: [String]
}, { collection: 'area' })

module.exports = mongoose.model('area', areaSchema)

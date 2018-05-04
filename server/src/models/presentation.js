var mongoose = require('mongoose')

var presentationSchema = new mongoose.Schema({
  name: String,
  slides: [{image: String, description: String}],
  Description: [String],
  slide1: String,
  text1: String,
  slide2: String,
  text2: String,
  slide3: String,
  text3: String,
  slide4: String,
  text4: String,
  length: {type: Number, default: 4},
  Product: String
}, { collection: 'presentation' })

module.exports = mongoose.model('presentation', presentationSchema)

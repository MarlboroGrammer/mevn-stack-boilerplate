var mongoose = require('mongoose')
var url = 'mongodb://localhost/pharmakeys'

mongoose.connect(url, function (err, result) {
  if (err) {
    return console.log('Could not connect')
  }
  console.log('Connected')
  return result
})
module.exports = mongoose

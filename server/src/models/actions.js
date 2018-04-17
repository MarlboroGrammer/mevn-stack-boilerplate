var mongoose = require('mongoose')

var actionsSchema = new mongoose.Schema({
  date: Date,
  amount: Number,
  delegate: {type: mongoose.Schema.ObjectId, ref: 'delegate'}
}, { collection: 'actions' })

module.exports = mongoose.model('actions', actionsSchema)

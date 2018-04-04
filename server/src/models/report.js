/* eslint-disable no-unused-vars */
var mongoose = require('mongoose')
var client = require('./client.js')
var delegate = require('./delegate')
var reportSchema = new mongoose.Schema({
  date: Date,
  objectif: String,
  potential: String,
  pharmacy: String,
  doctor: String,
  wholesaler: String,
  hospital: {
    name: String,
    serivce: String,
    doctorName: String,
    Specialty: String,
    doctorTitle: String
  },
  clinic: {
    name: String,
    serivce: String,
    doctorName: String,
    Specialty: String,
    doctorTitle: String
  },
  order: {
    type: {type: String, enum: ['Pack gros 1', 'Pack gros 2', 'Pack gros 3', 'Regular']},
    products: [{productName: String, quantity: Number}],
    TotalEL: Number
  },
  potentialProducts: [
    {productName: String, note: String}
  ],
  samples: [
    {sampleName: String, quantity: Number}
  ],
  delegate: {type: mongoose.Schema.ObjectId, ref: 'delegate'},
  notes: String
}, { collection: 'report' })

module.exports = mongoose.model('report', reportSchema)

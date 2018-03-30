var express = require('express')
var router = express.Router()
var Reports = require('./models/report')

router.get('/', function (req, res, next) {
  Reports.find({}).populate('delegate').exec(function (err, reports) {
    if (err) {
      res.send(err)
    } else {
      console.log('Testing delegate population: ', reports[0].delegate)
      res.json(reports)
    }
  })
})

module.exports = router

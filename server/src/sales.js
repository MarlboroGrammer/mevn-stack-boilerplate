var express = require('express')
var router = express.Router()
var sales = require('./models/sales')

router.get('/', function (req, res, next) {
  sales.find({}).populate('delegate').populate('report').exec(function (err, sales) {
    if (err) {
      res.send(err)
    } else {
      res.json(sales)
    }
  })
})

module.exports = router

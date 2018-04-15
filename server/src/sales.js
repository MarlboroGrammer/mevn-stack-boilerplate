var express = require('express')
var router = express.Router()
var sales = require('./models/sales')

router.get('/', function (req, res, next) {
  sales.find({}, function (err, products) {
    if (err) {
      res.send(err)
    } else {
      res.json(products)
    }
  })
})

module.exports = router

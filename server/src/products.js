var express = require('express')
var router = express.Router()
var Products = require('./models/product')

router.get('/', function (req, res, next) {
  Products.find({}, function (err, products) {
    if (err) {
      res.send(err)
    } else {
      res.json(products)
    }
  })
})

module.exports = router

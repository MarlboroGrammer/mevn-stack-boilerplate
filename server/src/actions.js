var express = require('express')
var router = express.Router()
var actions = require('./models/actions')

router.get('/', function (req, res, next) {
  actions.find({}).populate('delegate').exec(function (err, actions) {
    if (err) {
      res.send(err)
    } else {
      console.log('One delegate boi:', actions[0].delegate)
      res.json(actions)
    }
  })
})

module.exports = router

var express = require('express')
var router = express.Router()
var Degelates = require('./models/delegate')

router.get('/:credentialsId', function (req, res, next) {
  console.log('credentials id:', req.params.credentialsId)
  Degelates.findOne({'credentials': req.params.credentialsId + ''}, function (err, delegate) {
    if (err) {
      res.send(err)
    } else {
      console.log('Testing delegate', delegate)
      res.json(delegate)
    }
  })
})

module.exports = router

var express = require('express')
var router = express.Router()
var Degelates = require('./models/delegate')

router.get('/:credentialsId', function (req, res, next) {
  console.log('credentials id:', req.params.credentialsId)
  Degelates.findOne({'credentials': req.params.credentialsId + ''}, function (err, delegate) {
    if (err) {
      res.send(err)
    } else {
      res.json(delegate)
    }
  })
})

router.get('/d/:delegateId', function (req, res, next) {
  Degelates.findOne({'_id': req.params.delegateId + ''}, function (err, delegate) {
    if (err) {
      res.send(err)
    } else {
      res.json(delegate)
    }
  })
})

router.get('/', function (req, res, next) {
  Degelates.find({}, function (err, delegates) {
    if (err) {
      res.send(err)
    } else {
      res.json(delegates)
    }
  })
})

module.exports = router

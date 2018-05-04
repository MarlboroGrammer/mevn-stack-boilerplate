var express = require('express')
var router = express.Router()
var Client = require('./models/client')

router.post('/client', function (req, res) {
  var client = new Client({
    name: req.body.name,
    email: req.body.email,
    type: req.body.type,
    phoneNumber: req.body.phoneNumber,
    lat: req.body.lat,
    lng: req.body.lng,
    address: {city: req.body.city, postalCode: req.body.postalCode, street: req.body.street}

  })

  client.save(function (err, result) {
    if (err) {
      res.send(err)
    }
    res.json({ message: 'Client added' })
  })
})

router.get('/client', function (req, res) {
  Client.find({}, function (err, result) {
    if (err) {
      res.send(err)
    }
    if (!result) {
      res.status(404).send()
    } else {
      res.send({
        clients: result
      })
      // res.json(result)
    }
  })
})

router.delete('/client/:id', (req, res) => {
  Client.remove({
    _id: req.params.id
  }, function (err, post) {
    if (err) { res.send(err) }
    res.send({
      success: true
    })
  })
})

// Update a client
router.put('/client/:id', function (req, res) {
  var id = req.params.id
  var name = req.body.name
  console.log(name)

  Client.findOneAndUpdate({'_id': id}, req.body, {new: true}, function (err, result) {
    if (err) {
      res.send(err)
    }
    if (!result) {
      res.status(400).send()
    } else {
      res.send(result)
    }
  })
})

module.exports = router

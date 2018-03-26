var express = require('express')
var router = express.Router()
var Credentials = require('./models/credentials')
var bcrypt = require('bcrypt-nodejs')
var jwt = require('jsonwebtoken')

router.post('/register', function (req, res) {
  var credentialsObj = new Credentials({
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
  })
  credentialsObj.save(function (err, result) {
    if (err) {
      res.send(err)
    }
    res.json({ message: 'succesfully posted' })
  })
})

router.post('/authenticate', function (req, res) {
  console.log(req.body)
  Credentials.findOne({ username: req.body.username }, function (err, data) {
    if (err) {
      res.send(err)
    }
    if (!data){
      res.send('NOTFOUND')
    } else {
      console.log('Password hash: ', data)
      if (bcrypt.compareSync(req.body.password, data.password)) {
        var token = jwt.sign({ username: req.body.username }, 'secret', { expiresIn: 50000 })
        console.log(token)
        res.send(data)
      }
    }
  })
})

module.exports = router

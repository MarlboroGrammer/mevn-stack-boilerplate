var express = require('express')
var router = express.Router()
var Credentials = require('./models/credentials')
var bcrypt = require('bcrypt-nodejs')
var jwt = require('jsonwebtoken')

function jwtSignUser (username) {
  // const ONE_WEEK = 60 * 60 * 24 * 7
  return jwt.sign(username, 'secret', null)
}

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
  console.log('Debug started')
  Credentials.findOne({ username: req.body.username }, function (err, data) {
    if (err) {
      res.send(err)
      console.log('err if case', err)
    } else if (!data) {
      console.log('data if case')
      return res.status(403).send({
        error: 'The login informatuon was incorrect'
      })
    } else {
      console.log('gonna compare password')
      if (bcrypt.compareSync(req.body.password, data.password)) {
        console.log('Our username is: ', req.body.username)
        var token = jwtSignUser(req.body.username)
        console.log('nop!', token)
        res.send({
          signedUser: data,
          userToken: token
        })
      } else {
        console.log('password is incorrect')
        return res.status(403).send({
          error: 'The login informatuon was incorrect'
        })
      }
    }
  })
})

module.exports = router

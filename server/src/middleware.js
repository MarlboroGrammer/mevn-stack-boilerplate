var jwt = require('jsonwebtoken')

module.exports.authenticate = function (req, res) {
  var header = req.headers.authorization
  if (header) {
    var token = header.split(' ')[1]
    jwt.verify(token, 'secret', function (err, result) {
      if (err) {
        res.send(err)
      } else {
        res.send(result)
      }
    })
  } else {
    res.status(403).json('not valid token')
  }
}

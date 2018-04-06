const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const fileUpload = require('express-fileupload')
const db = require('./config/connection')
const user = require('./user')
const product = require('./APIproduct')
const visit = require('./APIvisit')
const app = express()
const config = require('./config/parameters')

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())
app.use(fileUpload())
app.use('/users', user)
app.use('/products', product)
app.use('/visits', visit)
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})
// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  // render the error page
  res.status(err.status || 500)
  res.json({ error: err })
})
db.connect(config.DB_URL, function (err, result) {
  if (err) {
    return console.log('Could not connect', err)
  }
  app.listen(config.PORT)
  console.log('Server Alive & Connected')
})

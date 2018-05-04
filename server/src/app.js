const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const db = require('./config/connection')
const user = require('./user')
const visit = require('./APIvisit')
const product = require('./APIproduct')
const reports = require('./reports')
const delegates = require('./delegates.js')
const sales = require('./sales.js')
const actions = require('./actions.js')
const clients = require('./client.js')
const presentation = require('./presentation.js')

const app = express()
const config = require('./config/parameters')

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())
app.use('/users', user)
app.use('/reports', reports)
app.use('/delegates', delegates)
app.use('/products', product)
app.use('/visits', visit)
app.use('/sales', sales)
app.use('/actions', actions)
app.use('/clients', clients)
app.use('/presentation', presentation)

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
  res.render('error')
})
db.connect(config.DB_URL, function (err, result) {
  if (err) {
    return console.log('Could not connect', err)
  }
  app.listen(config.PORT)
  console.log('Server Alive & Connected')
})

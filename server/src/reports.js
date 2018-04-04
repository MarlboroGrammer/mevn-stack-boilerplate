var express = require('express')
var router = express.Router()
var Reports = require('./models/report')

router.get('/', function (req, res, next) {
  Reports.find({}).populate('delegate').exec(function (err, reports) {
    if (err) {
      res.send(err)
    } else {
      console.log('Testing delegate population: ', reports[0].delegate)
      res.json(reports)
    }
  })
})

router.get('/delegate/:delegateid', function (req, res, next) {
  console.log('Getting the id from the url: ', req.params.delegateid)
  Reports.find({'delegate': req.params.delegateid}, function (err, reports) {
    if (err) {
      res.send(err)
    } else {
      console.log('Testing fetch by delegate', reports)
      res.json(reports)
    }
  })
})

router.post('/add', function (req, res, next) {
  let ReportObj = {}
  console.log('potentialProducts array that i got here is : ', req.body.potentialProducts)
  switch (req.body.type) {
    case 'Pharmacy':
      ReportObj = new Reports({
        date: new Date(),
        pharmacy: req.body.pharmacyName,
        potential: req.body.pharmacyPotential,
        objectif: req.body.visitObjectif,
        potentialProducts: req.body.potentialProducts,
        delegate: req.body.delegate,
        order: req.body.order,
        samples: req.body.samples,
        notes: req.body.notes
      })
      break
  }
  ReportObj.save(function (err, result) {
    if (err) {
      res.send(err)
    }
    res.json(ReportObj)
  })
})

module.exports = router

var express = require('express')
var router = express.Router()
var Reports = require('./models/report')

router.get('/', function (req, res, next) {
  Reports.find({}).populate('delegate').exec(function (err, reports) {
    if (err) {
      res.send(err)
    } else {
      // console.log('Testing delegate population: ', reports[0].delegate)
      res.json(reports)
    }
  })
})

router.get('/:reportId', function (req, res, next) {
  Reports.findOne({'_id': req.params.reportId}).populate('delegate').exec(function (err, report) {
    if (err) {
      res.send(err)
    } else {
      console.log('Testing delegate population: ', report.delegate)
      res.json(report)
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
        type: req.body.type,
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
    case 'Wholesaler':
      ReportObj = new Reports({
        date: new Date(),
        type: req.body.type,
        wholesaler: req.body.wholesalerName,
        potential: req.body.wholesalerPotential,
        objectif: req.body.visitObjectif,
        potentialProducts: req.body.potentialProducts,
        delegate: req.body.delegate,
        order: req.body.order,
        samples: req.body.samples,
        notes: req.body.notes
      })
      break
    case 'Hospital':
      ReportObj = new Reports({
        date: new Date(),
        type: req.body.type,
        hospital: req.body.hospital,
        potential: req.body.hospitalPotential,
        objectif: req.body.visitObjectif,
        potentialProducts: req.body.potentialProducts,
        delegate: req.body.delegate,
        samples: req.body.samples,
        notes: req.body.notes
      })
      break
    case 'Clinic':
      ReportObj = new Reports({
        date: new Date(),
        type: req.body.type,
        clinic: req.body.clinic,
        potential: req.body.clinicPotential,
        objectif: req.body.visitObjectif,
        potentialProducts: req.body.potentialProducts,
        delegate: req.body.delegate,
        samples: req.body.samples,
        notes: req.body.notes
      })
      break
    case 'Doctor':
      ReportObj = new Reports({
        date: new Date(),
        type: req.body.type,
        doctor: req.body.doctorName,
        potential: req.body.doctorPotential,
        objectif: req.body.visitObjectif,
        potentialProducts: req.body.potentialProducts,
        delegate: req.body.delegate,
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

router.put('/approve/:reportid', function (req, res, next) {
  Reports.findOneAndUpdate({'_id': req.params.reportid}, {'status': 'Accepted'}, {upsert: true}, function (err, doc) {
    if (err) {
      res.send(err)
    } else {
      res.send('Approved')
    }
  })
})

router.put('/reject/:reportid', function (req, res, next) {
  Reports.findOneAndUpdate({'_id': req.params.reportid}, {'status': 'Rejected'}, {upsert: true}, function (err, doc) {
    if (err) {
      res.send(err)
    } else {
      res.send('Rejected')
    }
  })
})

module.exports = router

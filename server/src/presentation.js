var express = require('express')
var router = express.Router()
var Presentation = require('./models/presentation')

router.post('/', function (req, res) {
  var presentation = new Presentation(req.body)

  presentation.save(function (err, result) {
    if (err) {
      res.send(err)
    } else {
      res.json({message: 'INSERT DONE'})
    }
  })
})

router.get('/', function (req, res) {
  Presentation.find({}, function (err, result) {
    if (err) {
      res.send(err)
    }
    if (!result) {
      res.status(404).send()
    } else {
      res.json(result)
    }
  })
})
router.get('/:id', function (req, res, next) {
  Presentation.findOne({'_id': req.params.id}).populate('presentation').exec(function (err, Presentation) {
    if (err) {
      res.send(err)
    } else {
      console.log('presentation')
      res.json(Presentation)
    }
  })
})
router.post('/upload', function (req, res) {
  console.log('Image name:', req.files)
  if (!req.files) { return res.status(400).send('No files were uploaded.') }
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.sampleFile
  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv('.uploads/' + req.files.sampleFile.name, function (err) {
    if (err) { return res.status(500).send(err) }

    res.send('File uploaded!')
  })
})
module.exports = router

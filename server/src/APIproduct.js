var express = require('express')
var router = express.Router()
var Produit = require('./models/product')
// const notifier = require('node-notifier')

router.post('/', function (req, res) {
  var produit = new Produit(req.body)

  produit.save(function (err, result) {
    if (err) {
      res.send(err)
    }
    res.json({message: 'INSERT DONE'})
  })
})

router.get('/', function (req, res) {
  Produit.find({}, function (err, result) {
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

router.put('/:id', function (req, res) {
  var id = req.params.id
  var name = req.body.name
  console.log(name)

  Produit.findOneAndUpdate({'_id': id}, req.body, {new: true}, function (err, result) {
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
router.post('/upload', function (req, res) {
  if (!req.files) { return res.status(400).send('No files were uploaded.') }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.sampleFile

  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv('../server/src/uploads/'+req.files.sampleFile.name, function (err) {
    if (err) { return res.status(500).send(err) }

    res.send('File uploaded!')
  })
})
router.delete('/:id', function (req, res) {
  var id = req.params.id
  console.log(id)
  Produit.findOneAndRemove({'_id': id}, function (err, result) {
    if (err) {
      res.send(err)
    }
    res.json({message: 'DELETE DONE'})
  })
})

module.exports = router

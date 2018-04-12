var express = require('express')
var router = express.Router()
var EvenT = require('./models/visit').visit
const notifier = require('node-notifier')

router.post('/admin/add', function (req, res) {
  var event = new EvenT(req.body)

  event.save(function (err, result) {
    if (err) {
      res.send(err)
    }
    res.json({message: 'INSERT DONE'})
  })
})

router.get('/admin/data', function (req, res) {
  EvenT.find({}, function (err, result) {
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

router.put('/admin/data/:id', function (req, res) {
  var id = req.params.id
  var text = req.body.text
  console.log(text)

  EvenT.findOneAndUpdate({'_id': id}, req.body, {new: true}, function (err, result) {
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

router.delete('/admin/data/:id', function (req, res) {
  var id = req.params.id
  console.log(id)
  EvenT.findOneAndRemove({'_id': id}, function (err, result) {
    if (err) {
      res.send(err)
    }
    res.json({message: 'DELETE DONE'})
  })
})

router.get('/data', function (req, res) {
  var todayDate = new Date().toISOString().slice(0, 10)
  var dateevent = new Date()

  EvenT.find({}, function (err, result) {
    if (err) {
      res.send(err)
    }
    if (!result) {
      res.status(404).send()
    } else {
      for (var i = 0; i < result.length; i++) {
        result[i].id = result[i]._id
        dateevent = result[i].start_date.toISOString().slice(0, 10)

        if (todayDate === dateevent) {
          notifier.notify({
            'title': 'PharmaKeys Notification',
            'subtitle': 'Calendrier',
            'message': result[i].text,
            'icon': './public/images/PKL1V-page-001.jpg',
            'contentImage': './public/images/PKL1V-page-001.jpg',
            'sound': '12eminemmockingbird.mp3',
            'wait': true
          })
        }
      }

      res.json(result)
    }
  })
})

router.post('/data', function (req, res) {
  var data = req.body

  // get operation type
  var mode = data['!nativeeditor_status']
  // get id of record
  var sid = data.id
  // var tid = sid

  // remove properties which we do not want to save in DB
  // delete data.id;
  delete data['!nativeeditor_status']

  // output confirmation response
  /* function update_response (err, result) {
    if (err) { mode = 'error' } else if (mode === 'inserted') { tid = data._id }

    res.setHeader('Content-Type', 'application/json')
    res.send({action: mode, sid: sid, tid: tid})
  } */

  // run db operation
  // Update
  if (mode === 'updated') {
    console.log('update' + sid)
    EvenT.findOneAndUpdate({'id': sid}, data, function (err, result) {
      if (err) {
        console.log(err)
      } else {
        console.log('Modify done')
      }
    })
  }
  // insertion
  if (mode === 'inserted') {
    var event = new EvenT(data)
    event.save(function (err, result) {
      if (err) {
        console.log(err)
      } else {
        console.log('Insert done')
      }
    })
    //  db.event.insert(data, update_response);
  }
  // Delete
  if (mode === 'deleted') {
    EvenT.findOneAndRemove({'id': sid}, function (err, result) {
      if (err) {
        console.log(err)
      } else {
        console.log('Delete DONE')
      }
    })
  } else { res.send('Not supported operation') }
})

router.get('/test', function (req, res) {
  res.send({'Notification': 'Notification coming in 3.2.1'})
})
module.exports = router

var mongoose = require('mongoose')
var delegate = require('./delegate.js')
var client = require('./client.js')
var planningSchema = new mongoose.Schema({
  date: Date,
  delegate: delegate.schema,
  horaire: {
    type: String,
    enum: ['Morning', 'Afternoon', 'Evening']
  },
  objective: {
    type: String,
    enum: [
      'Visite de lancement',
      'Réponse à objection',
      'Visite de rappel',
      'Convaincre de prescrire',
      'Mise en place',
      'Proposition challenge',
      'Suivi challenge',
      'Commande pack',
      'Mise en place produits',
      'Recouvrement',
      'Livraison',
      'Recueil statistique',
      'Remise Bon Achat',
      'Autres '
    ]
  },
  status: Boolean,
  visited: client.schema
}, { collection: 'planning' })

module.exports = mongoose.model('planning', planningSchema)

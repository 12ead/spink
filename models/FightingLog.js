var mongoose = require('mongoose')

var fightinglogSchema = mongoose.Schema({

  type:           { type: Number },     // 0 : vs , 1 win , 2 lose
  winner:         { type: mongoose.Schema.ObjectId },
  loser:          { type: mongoose.Schema.ObjectId },
  winner_score:   { type: Number },
  loser_score:    { type: Number },
  showup_date:    { type: Date },
  fighting_date:  { type: String },
  createdAt:      { type:Date, default:Date.now }
})

var FightingLog = mongoose.model('fighting_activity', fightinglogSchema)

module.exports = FightingLog

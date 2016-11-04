var mongoose = require('mongoose')

var rankingOfEachDaySchema = mongoose.Schema({
  user_id:              { type: mongoose.Schema.ObjectId },
  nickname:             { type: String, required:true, unique:true },
  totalWins:            { type: Number },
  rankingdayis:         { type: String },
  createdDay:           { type: Date, default:Date.now }
})

var RankingOfEachDay = mongoose.model('rankingofeachday', rankingOfEachDaySchema)

module.exports = RankingOfEachDay

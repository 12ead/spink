var mongoose = require('mongoose')

var characterSchema = mongoose.Schema({
  user_id:            { type: mongoose.Schema.ObjectId },
  status:             { type: [Number] },
  last_status:        { type: [Number] },
  accumulated_status: { type: [Number] },
  createdAt:          { type:Date, default:Date.now },
  updatedAt:          { type:Date, default:Date.now }
})

var Character = mongoose.model('character', characterSchema)

module.exports = Character

var mongoose = require('mongoose')

var chatMessageSchema = mongoose.Schema({
  user_id:            { type: mongoose.Schema.ObjectId },
  message:            { type: String },
  writedAt:           { type: Date, default:Date.now }
})

var ChatMessage = mongoose.model('chatmessege', chatMessageSchema)

module.exports = ChatMessage

var mongoose = require('mongoose')
var bcrypt = require("bcrypt-nodejs")

var chainSchema = mongoose.Schema({
  order:         { type: Number },
  input_numbers: { type:[Number] },
  chain_numbers: { type:[Number] },
  user_id:       { type: mongoose.Schema.ObjectId },
  createdAt:     { type:Date, default:Date.now }
})

var SpinkChain = mongoose.model('spink_chain', chainSchema)
module.exports = SpinkChain

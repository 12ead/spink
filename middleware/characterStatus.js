var createRandomSpinkArray = require( '../lib/spink').createRandomSpinkArray
var query = require('../query')
var User = require('../models/User')

var m = {}

m.resetAllStatus = function(){
  // get users
  return User.find({}, {_id:1})
  .then( r => {
    var works = r.map( e => {
      var input_numbers = createRandomSpinkArray( 3 )
      var predict_numbers = createRandomSpinkArray( 3 )
      return query.createNewCharacterStatus( e._id, input_numbers, predict_numbers )
    })
    return Promise.all( works )
  })
  .then( r => {
    console.log("Reset Status All")
  })
}

module.exports = m

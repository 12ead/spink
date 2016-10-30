var m = {}

var CALCBOARD = [
//  0 1 2 3
  [ 0,0,0,0],  // 0
  [ 0,1,3,2],  // 1
  [ 0,3,2,1],  // 2
  [ 0,2,1,3],  // 3
]
m.calcSpink = function( source, input ){
  /*
  if( source.length != input.length ){
    throw "Spink Length different "
  }
  */
  return input.map( (v, k) => {
    return CALCBOARD[v][ ( source[k] == null ? 1 : source[k] ) ]
  })
}
var getRandomInt = require("./random")
m.createRandomSpinkArray = function( length ){
  var ret = []
  for( var i = 0 ; i < length ; ++ i ){
    ret[i] = getRandomInt(1, 4)
  }
  return ret
}

module.exports = m

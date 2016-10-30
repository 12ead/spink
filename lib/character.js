var shuffle = require("./shuffle")

var m = {}

var ABILITY_BOARD = {
  0: [ 77, 69, 54, 73, 67, 70 ],
  2: [ 79, 71, 56, 75, 69, 72 ],
  3: [ 82, 74, 59, 78, 72, 75 ],
  4: [ 86, 78, 63, 82, 76, 79 ],
  6: [ 92, 84, 69, 88, 82, 85 ],
  8: [100, 92, 77, 96, 90, 93 ],
  12:[112,104, 89,108,102,105 ],
  24:[136,128,113,132,127,129 ]
}

m.calcCharacterStatus = function( current_numbers, predict_numbers ){

  var weight = [2,3,4]
  var total_weight = predict_numbers
                      .map( (v, k) => ( v == current_numbers[k] ? weight[k] : 1 ) )
                      .reduce( ( prev, curr ) => prev * curr  )
  if( total_weight == 1 ) total_weight = 0

  var result = JSON.parse(JSON.stringify(ABILITY_BOARD[total_weight]));

  return shuffle(result)
}


module.exports = m

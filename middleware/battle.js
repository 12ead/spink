var FightingLog = require('../models/FightingLog')
var Character = require('../models/Character')
var moment = require('moment')

var shuffle = require( '../lib/shuffle' )

var datetime = require( '../lib/datetime')

var getRandomInt = require("../lib/random")

var query = require('../query')

var m = {}
var abcd = [ 0, 1, 2, 3, 4, 5 ]

var ROUND_FOR_SELECT_FIGHTING_TYPE = 0
var FIGHTING_TYPE_PER_ROUND = [ 1, 1, 0 ]   // 0: fight by random, 1 : fight by level

function calcScore( abcd, status ){
  return   ((status[abcd[0]] + status[abcd[1]]) * 2  +
            (status[abcd[2]] + status[abcd[3]]) * 3 ) *
            (status[abcd[4]])/100 + status[abcd[5]]
}

function FightingNowbyRandom( ){
  console.log("Fighting Now By Random ")
  return Character.find( {} )
  .then( r => {
    return shuffle( r )
  })
}
function FightingNowbyRank( term, fighting_date, current ){
  console.log("Fighting Now By Rank ")
  //return query.getRank( fighting_date )
  return FightingLog.aggregate([
    {
      $match: {
        fighting_date: fighting_date,
        type: 1
      }
    },
    {
      $group: {
        _id: "$winner",
        count: { $sum: 1 }
      }
    },
    {
      $lookup: {
        from: "characters",
        localField: "_id",
        foreignField: "user_id",
        as: "character"
      }
    }
  ]).sort("-count")
  .then( r => {
    if( r.length == 0 ){
      return FightingNowbyRandom()
    }
    // If rank is avaliable
    r = r.map( d => {
      return d.character[0]
    })

    //shuffle by rank
    var shuffle_unit_count = 8
    for( var i = 0 ; i < r.length ; i += shuffle_unit_count ){
      shuffle( r, i, Math.min( shuffle_unit_count, r.length - i ) )
    }
    return r
  })
}

/**
 * param term : second / fighting time
 **/

m.FightingNow = function( term ){
  var round = 0
  var current = datetime.Now()
  var fighting_date = current.format("YYYY-MM-DD")

  var current_type = FIGHTING_TYPE_PER_ROUND[ROUND_FOR_SELECT_FIGHTING_TYPE]
  ROUND_FOR_SELECT_FIGHTING_TYPE = ( ROUND_FOR_SELECT_FIGHTING_TYPE + 1 ) % ( FIGHTING_TYPE_PER_ROUND.length )

  var fighting_func = null
  switch( current_type ){
    case 0:
      fighting_func = FightingNowbyRandom
    break;
    case 1:
      fighting_func = FightingNowbyRank
    break;
  }

  return fighting_func( term, fighting_date, current )
  .then( players => {
    var fighting_result = []
    var maxterm = 1

    if( players.length % 2 != 0 ){
      fighting_result.push(
                    {
                      winner: players[ players.length - 1].user_id,
                      loser: null,
                      winner_score: 0,
                      loser_score: 0,
                      types: [ 0, 0, 0 ]
                    }
                  )
    }



    var gameCount = Math.floor(players.length / 2)
    for( var i = 0 ; i < gameCount ; ++ i ){
      abcd = shuffle( abcd )

      players[i].score              = calcScore( abcd, players[i].status )
      players[i + gameCount].score  = calcScore( abcd, players[i + gameCount].status )
      var winner = players[i]
      var loser = players[i + gameCount]
      if( winner.score < loser.score ){
        var temp = winner
        winner = loser
        loser = temp
      }
      round ++
      var c = { winner: winner.user_id,
                loser: loser.user_id,
                winner_score: winner.score,
                loser_score: loser.score,
                types: [ round, round + getRandomInt( 1, 6 ), round + getRandomInt( 1, 6 ) ] }

      fighting_result.push( c )

      maxterm = Math.max( maxterm, Math.max( c.types[1], c.types[2] ) )
    }
    var result = []
    var one_term = Math.floor( term / maxterm )
    fighting_result.map( d => {
      if( null == d.loser ){
        result.push({ winner: d.winner, loser: null, winner_score: 0, loser_score: 0, type: 1,
                      createdAt: current.toISOString(), showup_date: current.toISOString(), fighting_date: fighting_date })
      } else {
        d.types.forEach( (v, k) => {
          result.push({ winner: d.winner, loser: d.loser, winner_score: d.winner_score, loser_score: d.loser_score, type: k,
                        createdAt: current.toISOString(), showup_date: current.clone().add( one_term * v ,'s' ).toISOString(), fighting_date: fighting_date })
        })
      }
    })

    return FightingLog.insertMany( result )
  })

}

/*
var i = 0 ;
function runNextFight(){
  return m.FightingNow(10)
  .then( r=> {
    ++ i
    if( i < 10000 ){
      return runNextFight()
    }else{
      return "Done"
    }
  })

}

runNextFight()
.then( r => {
  console.log("Then")
})
.catch( e=>{
  console.log(e)
})
*/

module.exports = m

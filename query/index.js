var m = {}

//////////////////////////////////////////////////////////////////////////////
// Chain Querys
var calcSpink = require("../lib/spink").calcSpink
var SpinkChain = require("../models/Chain")

var initialValue = {
  order: 0,
  input_numbers: [1,1,1],
  chain_numbers: [1,1,1]
}
var lastChain = null

m.getLastChain = function(){
  if( null == lastChain ){
    return SpinkChain.findOne()
      .sort('-order')
      .then( r => {
          if( null == r ){
            // if collection is empty / insert 1,1,1
            return SpinkChain.create( initialValue )
            .then( r => {
              return initialValue
            })
          } else {
            return r
          }
      })
      .then( r => {
        lastChain = r
        return lastChain
      })
  } else {
    return Promise.resolve( lastChain )
  }
}

m.addNewChain = function( input_numbers, user_id ){
  return Promise.resolve()
  .then( () => {
    if( null == lastChain){
      return m.getLastChain()
    }else {
      return lastChain
    }
  })
  .then( last => {
    // Check
    var newChain = {}
    newChain.chain_numbers = calcSpink( last.chain_numbers, input_numbers )
    newChain.input_numbers = input_numbers
    newChain.order = last.order + 1
    newChain.user_id = user_id

    console.log( newChain )

    return SpinkChain.create( newChain )
    .then( r => {
      return newChain
    })
  })
  .then( newChain => {
    lastChain = newChain
    return lastChain
  })
}

var datetime = require("../lib/datetime")
var moment = require('moment')

//////////////////////////////////////////////////////////////////////////////
// Character Querys
var Character = require("../models/Character")
var calcCharacterStatus = require("../lib/character").calcCharacterStatus

m.createNewCharacterStatus = function( user_id, input_numbers, predict_numbers ) {
  return m.addNewChain( input_numbers, user_id )
  .then( chain => {
    var newStatus = calcCharacterStatus( chain.chain_numbers, predict_numbers )

    var now = datetime.Now()

    return Character.findOne( { user_id: user_id } )
    .then( r => {

      var updateSet = {
        status: newStatus,
        updatedAt: datetime.Now().toISOString()
      }

      if( null == r ){

        updateSet.last_status = newStatus.map( d => 0 )
        updateSet.accumulated_status = updateSet.last_status
        updateSet.createdAt = datetime.Now().toISOString()

      } else if( !moment(r.updatedAt).isSame( now, 'day' ) ){

        // Every day we have to calculate accumulated_status
        var createdAt = r.createdAt

        // Null Check
        if( createdAt == null ){
          createdAt = r.updatedAt
        }
        if( r.last_status == null || r.last_status.length == 0  ){
          r.last_status = r.status
        }
        if( r.accumulated_status == null || r.accumulated_status.length == 0 ){
          r.accumulated_status = r.last_status
        }

        // Calculate days and accumulated Status
        var days = Math.abs(moment(createdAt).diff( moment(r.updatedAt), "days" ))
        updateSet.last_status = r.status
        updateSet.accumulated_status = updateSet.last_status.map( ( d, k ) => {
          return ( days * r.accumulated_status[k] + d ) / ( days + 1 )
        })
      }

      return Character.findOneAndUpdate(
        { user_id: user_id },
        { $set: updateSet },
        { upsert: true }
      ).then( r => {
        return newStatus
      })

    })
    .catch( e => {
      console.log( e)
    })


  })
}
//////////////////////////////////////////////////////////////////////////////
// Battle Querys
var FightingLog = require('../models/FightingLog')
var datetime = require('../lib/datetime')

m.getTodayUserBattleScore = function( user_id ) {
  var fighting_date = datetime.Now().format("YYYY-MM-DD")
  var now = datetime.Now().toISOString()
  var result = [
    FightingLog.find( { winner: user_id, showup_date: { $lt: now }, fighting_date: fighting_date, type: 1 } ).count(),
    FightingLog.find( { loser: user_id,  showup_date: { $lt: now }, fighting_date: fighting_date, type: 2 } ).count()
  ]

  return Promise.all(result)
  .then( r => {
    return { winning: r[0], losing: r[1] }
  })
}

/**
 * date string => YYYY-MM-DD
 **/
m.getRank = function( date, limit ){
  var query = FightingLog.aggregate([
    {
      $match: {
        fighting_date: date,
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
        from: "users",
        localField: "_id",
        foreignField: "_id",
        as: "user"
      }
    }
  ])

  if( limit != null ){
    return query.sort("-count").limit(limit)
  }else {
    return query.sort("-count")
  }
}

m.getTodayRank = function(){
  var fighting_date = datetime.Now().format("YYYY-MM-DD")
  return m.getRank( fighting_date, 10 )
}

m.getYesterdayRank = function(){
  var yesterday_date = moment(datetime.Now()).subtract(1, "day").format('YYYY-MM-DD')
  return m.getRank( yesterday_date, 10 )
}

var datetime = require('../lib/datetime')

m.getBattleStatus = function(){
  return FightingLog.aggregate([
      {
        $match: {
          showup_date: { $lt: datetime.Now().toDate() }
        }
      },
      {
        $sort: {
          showup_date: -1
        }
      },
      {
        $limit : 3
      },
      {
        $lookup: {
          from: "users",
          localField: "winner",
          foreignField: "_id",
          as: "winner_info"
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "loser",
          foreignField: "_id",
          as: "loser_info"
        }
      }
    ])
}

module.exports = m

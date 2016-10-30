var router    = require('express').Router();
var query = require('../query')
var User = require('../models/User')
var Character = require('../models/Character')
var ChatMessage = require('../models/ChatMessage')
var moment = require('moment')

router.get('/', function(req,res){
  ChatMessage.find({ }, null, { skip: 0, limit: 7, sort: '-writedAt' }, function(err, messages) {
      var data = {    // res.render 의 경우 주소가 /없이 시작, res.redirect의 경우 주소가 /가 있고 시작.
        body_template: 'spink/spink',
        user: req.user,
        messages: null,
        req_date: req.query.date,
        previous: moment(req.query.date).subtract(1, "day").format('MM.DD.YY')
      }
      if( data.req_date == null ){
        data.req_date = moment().format('YYYY-MM-DD')
      }
      // Make previous and next day
      var previous = moment(data.req_date).subtract(1, "day").format('YYYY-MM-DD')
      var next = moment(data.req_date).add(1, "day").format('YYYY-MM-DD')
      /*if (err){
        data.messages = null
      }*/

      if (messages) {
        data.messages = messages.reverse()
      }

      res.render('spink_main', data);
  });
});

router.get('/rank/view', function(req,res){
  var req_date = req.query.date
  if( req_date == null ){
    req_date = moment().format('YYYY-MM-DD')
  }
  // Make previous and next day
  var previous = moment(req_date).subtract(1, "day").format('YYYY-MM-DD')
  var next = moment(req_date).add(1, "day").format('YYYY-MM-DD')

  // Get rank
  query.getRank( req_date , 100 )
  .then( r => {
    //console.log(r)
    res.render('spink_main',{ body_template: 'spink/spinkrank', rank: r, req_date:req_date, previous: previous, next: next })
  })

})

router.get('/sum', function(req,res){
  var data = {    // res.render 의 경우 주소가 /없이 시작, res.redirect의 경우 주소가 /가 있고 시작.
      body_template: 'spink/spinksum'
  }
  res.render('spink_main', data);
});

// Restfull
router.post('/character/submit/:id', function( req, res ){
  var user_id = req.params.id
  var input_numbers = req.body.input_numbers
  var predict_numbers = req.body.predict_numbers
  query.createNewCharacterStatus( user_id, input_numbers, predict_numbers ).then( r => {
    //console.log("CreateCharacterStatus : ",r)
    res.json(r)
  })
})

router.get('/character/:id', function( req, res ){
  var user_id = req.params.id
  Character.findOne( { user_id: user_id } )
  .then( r => res.json(r) )
})

router.get('/battle/result/:id', function( req, res ){
  var user_id = req.params.id
  query.getTodayUserBattleScore( user_id )
  .then( r => res.json(r) )
})

// Battle status
router.get('/battle', function( req, res ) {
  query.getBattleStatus()
  .then( r => res.json(r) )
})

// Today Rank
router.get('/battle/rank', function( req, res ) {
  query.getTodayRank().then( r => res.json(r) )
})

// Test Url ( Submit spink number for all users )

var createRandomSpinkArray = require( '../lib/spink').createRandomSpinkArray
var resetAllStatus = require( '../middleware/characterStatus').resetAllStatus
router.get('/submit_with_random', function( req, res ){
  resetAllStatus()
  .then( r => {
    res.json(r)
  })
})

/*
var FightingNow = require( '../middleware/battle' ).FightingNow
router.get('/fighting_now', function( req, res ){
  FightingNow(60)
  .then( r => {
    res.json(r)
  })
})
*/

module.exports = router

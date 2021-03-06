var router    = require('express').Router();
var query = require('../query')
var User = require('../models/User')
var Character = require('../models/Character')
var ChatMessage = require('../models/ChatMessage')
var RankingOfEachDay = require('../models/RankingOfEachDay')
var moment = require('moment')

router.get('/', function(req,res){
  ChatMessage.find({ }, null, { skip: 0, limit: 7, sort: '-writedAt' }, function(err, messages) {
      // var data = {    // res.render 의 경우 주소가 /없이 시작, res.redirect의 경우 주소가 /가 있고 시작.
      //   body_template: 'spink/spink',
      //   user: req.user,
      //   messages: null,
      //   req_date: req.query.date,
      //   previous: moment(req.query.date).subtract(1, "day").format('MM.DD.YY'),
      // }
      var user = req.user
      //var messages = null
      var yesterday = moment(req.query.date).subtract(1, "day").format('YYYY-MM-DD')
      var winnerday = moment(req.query.date).subtract(1, "day").format('MM.DD.YY')

      /*if (err){
        data.messages = null
      }*/

      if (messages) {
        messages = messages.reverse()
      }

      query.getRank( yesterday, 10)
      .then( r => {
      res.render('spink_main', {body_template: 'spink/spink', rank: r, user: user, messages: messages, yesterday: yesterday, winnerday: winnerday} );
    })
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

router.get('/createRanking', function(req,res){
  var req_date = "2016-10-25"
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
    res.render('spink_main',{ body_template: 'spink/createRanking', rank: r, req_date:req_date, previous: previous, next: next })
  })

})


//test 16.11.02KR nh
router.get('/rank/sum1', function(req,res){
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
});


//test 16.11.02KR nh   localhost:3000/spink/sum       localhost:3000/sum 에서 계속 에러나서 두시간 정도 뻘짓,
router.get('/sum', function(req,res){
  var data = {    // res.render 의 경우 주소가 /없이 시작, res.redirect의 경우 주소가 /가 있고 시작.
      body_template: 'spink/spinksum'
  }
  res.render('spink_main', data);
});

router.get('/createRanking', function(req,res){
  var data = {    // res.render 의 경우 주소가 /없이 시작, res.redirect의 경우 주소가 /가 있고 시작.
        body_template: 'spink/createRanking'
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

//이 것을 버튼이 클릭했을 때 작동하도록 만든다음, 라우터 포스트는 현재 시간, 전달할 것도 현재 날짜와 시간, 쿼리.함수는 새로만드는랭킹-아직 함수 안만듬 아래 createNewCharacterStatus 참고해서 만들것,
// router.post('/character/submit/(해당날짜-날짜의 폼은 YYYY-MM-DD 이고 직접 입력할 수 있는 란이 있고, 이 라우터는 제출 버튼을 누르면, 작동.)', function( req, res ){
//   var user_id = req.params.id //버튼 클릭한 사람 아이디
//   var create_day = 오늘 날짜
//   query.createNewCharacterStatus( user_id, input_numbers, predict_numbers ).then( r => {
//     //console.log("CreateCharacterStatus : ",r)
//     res.json(r)
//   })
// })

// router.get('/topic', function(req, res){
//   res.send('hi');
// })
//
// router.get('/topic2', function(req, res){
//   res.send('hi');
// })


router.get('/topic1', function(req, res){
  res.send('hi');
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

router.get('/battle/yesterdayRank', function( req, res ) {
  query.getYesterdayRank().then( r => res.json(r) )
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

var CronJob = require('cron').CronJob;
var datetime = require('../lib/datetime');
var resetAllStatus = require( '../middleware/characterStatus').resetAllStatus


var FightingNow = require( '../middleware/battle' ).FightingNow
module.exports = function(){
  console.log("Registered CronJob")
  // Add Cron job
  var job_after_midnight_to_6pm = new CronJob('0,5,10,15,20,25,30,35,40,45,50,55 0-17 * * *', function(){
    FightingNow(300)
  }, function(){}, true, datetime.Timezone)

  var job_6pm_to_10pm = new CronJob('* 18-21 * * *', function(){
    FightingNow(60)
  }, function(){}, true, datetime.Timezone)

  var job_10pm_to_midnight = new CronJob('* 22-23 * * *', function(){
    FightingNow(15)
    setTimeout( ()=> FightingNow(15), 15000 )
    setTimeout( ()=> FightingNow(15), 30000 )
    setTimeout( ()=> FightingNow(15), 45000 )
  }, function(){}, true, datetime.Timezone)


  var restAllCharacterStatus = new CronJob('0 0 * * *', function(){
    resetAllStatus()
  }, function(){}, true, datetime.Timezone)

}

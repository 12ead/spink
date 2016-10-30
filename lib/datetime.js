var moment = require("moment")
var moment = require("moment-timezone")

var m = {}
m.Timezone = "America/Los_Angeles"
m.Now = function(){
  return moment().tz(m.Timezone)
}

module.exports = m

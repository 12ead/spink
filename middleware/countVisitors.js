
function countVisitors(req, res, next){
  if(!req.cookies.count && req.cookies['connect.sid']){
    res.cookie('count', "", {maxAge: 3600000, httpOnly: true});
    var now = new Date();
    var date= now.getFullYear() + "/" + now.getMonth() + "/" + now.getDate();
    if(date != req.cookies.countDate) {
      res.cookie("countDate", date, {maxAge: 86400000, httpOnly:true});

    var Counter = require('../models/Counter');
    Counter.findOne({name:"visitors"}, function(err, counter){
      if(err) return next();
      if(counter === null){
        Counter.create({name:"visitors",totalCount:1, todayCount:1, date:date});
      } else {
        counter.totalCount++;
        if(counter.date == date){
          counter.todayCount++;
        } else {
          counter.todayCount = 1;
          counter.date = date ;
        }
        counter.save();
      }
    });
  }
}
return next();
}

module.exports = countVisitors;

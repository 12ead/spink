var mongoose = require('mongoose');

function init( dbURL ){

  mongoose.Promise = global.Promise;

  mongoose.connect(dbURL);
  var db= mongoose.connection;
  db.once("open", function(){
    console.log("DB connected!");
  });
  db.on("error", function(err){
    console.log("DB ERROR :", err);
  });
}

//////////////////////////////////////
module.exports = { init: init }

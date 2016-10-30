var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var session = require('express-session');
var flash = require('connect-flash');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var methodOverride = require('method-override');
var countVisitors = require('./middleware/countVisitors');

var battle = require('./middleware/battle')

//var xFrameOptions = require('x-frame-options');

// database init
require('./models').init( process.env.MONGO_DB )

//view engine
app.set("view engine", 'ejs');

//middlewares
//app.use(xFrameOptions());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());
app.use(methodOverride("_method"));
app.use(flash());
app.use(session({secret:'MySecret'}));
app.use(countVisitors);

//passport
var passport = require('./config/passport');
//var xFrameMiddleware = xFrameOptions(headerValue='Sameorigin');
app.use(passport.initialize());
app.use(passport.session());

//routes
require("./routes")( app, passport );

var ChatMessage = require('./models/ChatMessage')

var count=1;
io.on('connection', function(socket){
  console.log('user connected: ', socket.id);

  socket.on('disconnect', function(){
    console.log('user disconnected: ', socket.id);
  });

  socket.on('send message', function(id,name,text ){
    var msg = name + ' : ' + text;
    console.log(msg);
    //몽고디비에 여기에서 저장
    var newChatMessage          = new ChatMessage();

    newChatMessage.user_id = id;
    newChatMessage.message = msg;
    newChatMessage.save();

    io.emit('receive message', msg);
  });
});



//start server
var port = process.env.PORT || 3000;
http.listen(port, function(){
  console.log("Server On!");

  // Start Cronjb
  var isDev = false
  process.argv.forEach(function (val, index, array) {
    if( val == "dev" ){
      isDev = true
    }
  });
  if( !isDev ){
    require("./middleware/cronjob")()
    console.log("Run cronjob")
  }else{
    console.log("Not Run cronjob")
  }

});

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

var mongodb = require('mongodb');

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
app.get('/test', function(req, res){
  res.send('hi');
})
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

/*
// 몽고디비 테스트 161105kr nh
var MongoClient = mongodb.MongoClient;

// Use connect method to connect to the Server
MongoClient.connect(process.env.MONGO_DB, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    //HURRAY!! We are connected. :)
    //console.log('Connection established to', url);

    // Get the documents collection
    var collection = db.collection('usertests'); //select the collection

    //Create some users
    var user1 = {name: 'modulus admin', age: 42, roles: ['admin', 'moderator', 'user']};
    var user2 = {name: 'modulus user', age: 22, roles: ['user']};
    var user3 = {name: 'modulus super admin', age: 92, roles: ['super-admin', 'admin', 'moderator', 'user']};

    // Insert some users
    collection.insert([user1, user2, user3], function (err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log('Inserted %d documents into the "users" collection. The documents inserted with "_id" are:', result.length, result);
      }
      //Close connection
      db.close();
    });
  }
});
*/


//아래를 실행해 보면 순서가 꽤 중요하다는것을 알수 있다. 이 '순서'에 익숙해져야 할 듯. 161105kr nh
var mongoose = require('mongoose')


var kittySchema = mongoose.Schema({
    name: String
});



//function 은 model전에 만들어져야함. function을 만들려면 Schema 가 있어야 하므로 Schema 가 먼저 정의되어 있어야 하고,
kittySchema.methods.speak = function () {
  var greeting = this.name
    ? "Meow name is " + this.name
    : "I don't have a name";
  console.log(greeting);
}

var Kitten = mongoose.model('Kitten', kittySchema);

var silence = new Kitten({ name: 'Silence' });
console.log(silence.name);


var fluffy = new Kitten({ name: 'fluffy' });
fluffy.speak(); // "Meow name is fluffy"
fluffy.save(function (err, fluffy) {
  if (err) return console.error(err);
  fluffy.speak();
});


Kitten.find(function (err, kittens) {
  if (err) return console.error(err);
  console.log(kittens);
})

// sum1(1, 2, function(sum) {
//     console.log(3 + sum);
// });
// function sum1(a,b, callback){
//     callback(a + b);
// };
//Kitten.find({ name: /^fluff/ }, callback){};
Kitten.find({ name: /^fluff/ }, function (err, name){
  if (err) return console.error(err);
  console.log("name :", name);
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

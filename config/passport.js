// config/passport.js

// load all the things we need
var passport      = require('passport');
var LocalStrategy    = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// load up the user model
var User       = require('../models/User');

// load the auth variables
var configAuth = require('./auth');

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

// code for login (use('local-login', new LocalStategy))
// code for signup (use('local-signup', new LocalStategy))
// code for facebook (use('facebook', new FacebookStrategy))
// code for twitter (use('twitter', new TwitterStrategy))

// =========================================================================
// GOOGLE ==================================================================
// =========================================================================
passport.use(new GoogleStrategy({

    clientID        : configAuth.googleAuth.clientID,
    clientSecret    : configAuth.googleAuth.clientSecret,
    callbackURL     : configAuth.googleAuth.callbackURL,

},
function(token, refreshToken, profile, done) {

    // make the code asynchronous
    // User.findOne won't fire until we have all our data back from Google
    process.nextTick(function() {

        // try to find the user based on their google id
        User.findOne({ 'google_id' : profile.id }, function(err, user) {
            if (err)
                return done(err);

            if (user) {

                // if a user is found, log them in
                return done(null, user);
            } else {
                // if the user isnt in our database, create a new user
                var newUser          = new User();

                // set all of the relevant information
                newUser.google_id    = profile.id;
                //newUser.google.token = token;
                newUser.nickname  = profile.displayName;
                newUser.email = profile.emails[0].value; // pull the first email
                newUser.password = 'googlegoogle'; // pull the first email

                // save the user
                newUser.save()
                .then( r => {
                  var createRandomSpinkArray = require( '../lib/spink').createRandomSpinkArray
                  var query = require('../query')
                  var input_numbers = createRandomSpinkArray( 3 )
                  var predict_numbers = createRandomSpinkArray( 3 )
                  return query.createNewCharacterStatus( r._id, input_numbers, predict_numbers )
                })
                .then( r => {
                  return done(null, newUser);
                });
            }
        });
    });

}));

module.exports = passport;
/*var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User          = require('../models/User');

passport.serializeUser(function(user, done){
  done(null, user.id);
});
passport.deserializeUser(function(id, done){
  User.findById(id, function(err, user){
    done(err, user);
  });
});


passport.use('local-login',
  new LocalStrategy({
      usernameField : 'email',
      passwordField : 'password',
      passReqToCallback : true
    },
    function(req, email, password, done){
      User.findOne({'email' : email}, function(err,user){
        if(err) return done(err);

        if(!user){
          req.flash("email", req.body.email);
          return done(null, false, req.flash('loginError', 'No user found.'));
        }
        if (!user.authenticate(password)){
          req.flash("email", req.body.email);
          return done(null, false, req.flash('loginError', 'password does not Match'));
        }
        req.flash('postsMessage', 'Welcome ' + user.nickname+'!');
        return done(null, user);
      });
    }
  )
);

module.exports = passport;
*/

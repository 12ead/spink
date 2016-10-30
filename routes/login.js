var express   = require('express');
var router    = express.Router();
var mongoose  = require('mongoose');
var passport  = require('../config/passport.js');

router.get('/', function(req, res){
res.render('login/login', {email:req.flash("email")[0], loginError:req.flash('loginError'), loginMessage:req.flash('loginMessage')});
});
router.post('/', passport.authenticate('local-login',{
  successRedirect : '/posts',
  failureRedirect : '/login',
  failureFlash : true
  })
);
router.get('/logout', function(req, res){
  req.logout();
  req.flash("postsMessage", "Good-bye, Have a nice day!");
  res.redirect('/');
});

module.exports = router;

var express   = require('express');
var router    = express.Router();
var mongoose  = require('mongoose');
var User      = require('../models/User'); console.log("routes/users 에서 var User 실행");
var async     = require('async');

//시작이 views 인 듯..
//set user route
router.get('/new', function(req,res){ console.log("유저 가입 페이지 접속"); // /new로 들어오면 호출되는 부분.
  res.render('users/new',{    // res.render 의 경우 주소가 /없이 시작, res.redirect의 경우 주소가 /가 있고 시작.
                          formData: req.flash('formData')[0],
                          emailError: req.flash('emailError')[0],
                          nicknameError: req.flash('nicknameError')[0],
                          passwordError: req.flash('passwordError')[0]

                        }
  );
}); //new

router.post('/', checkUserRegValidation, function(req, res, next){ console.log("router.post('/'");
  User.create(req.body.user, function (err, user){
    if(err) return res.json({success:false, message:err});
    req.flash("loginMessage", "Thank you for registration!");
    res.redirect('/login');
  });
}); //create

router.get('/:id', isLoggedIn, function(req, res){ console.log("router.post('/'");
  User.findById(req.params.id, function (err,user){
    if(err) return res.json({success:false, message:err});
    res.render("users/show", {user: user});
  });
}); //show

router.get('/:id/edit', isLoggedIn, function(req,res){ console.log("router.get('/:id/edit'");
  if(req.user._id != req.params.id) return res.json({success:false, message:"Unauthrized Attempt"});
  User.findById(req.params.id, function (err, user){
    if(err) return res.json({success:false, message:err});
    res.render("users/edit",{
                              user: user,
                              formData: req.flash('formData')[0],
                              emailError: req.flash('emailError')[0],
                              nicknameError: req.flash('nicknameError')[0],
                              passwordError: req.flash('passwordError')[0]
                            }
    );
  });
}); //edit

router.put('/:id',isLoggedIn, checkUserRegValidation, function(req, res){ console.log("router.put('/:id'");
  if(req.user._id != req.params.id) return res.json({success:false, message:"Unauthrized Attempt"});
  User.findById(req.params.id, function(err, user) {
    if(err) return res.json({success:"false", message:err});
    if(user.authenticate(req.body.currentPassword)) {
      if(req.body.user.newPassword){
        req.body.user.password = user.hash(req.body.user.newPassword);
      }
      User.findByIdAndUpdate(req.params.id, req.body.user, function (err, user){ //Check the Error User.findByIdUpdate 라고써서 에러났었음
        if(err) return res.json({success:"false", message:err});
        res.redirect('/users/'+req.params.id);
      });
    } else {
      req.flash("formData", req.body.user);
      req.flash("passwordError", "- Inavalid password");
      res.redirect('/users/'+req.params.id+"/edit");  //Check the Error - '/user/'+req.params.id+"/edit" 에러남 -> '/users/'+req.params.id+"/edit"로 s를 추가 해야함.
    }
  });
}); //update

router.put('/changeNickName/:id', isLoggedIn, function(req, res){
  if(req.user._id != req.params.id) return res.json({success:false, message:"Unauthrized Attempt"});

  User.findById( req.params.id )
  .then( r => {
    if( null == r) {
      throw "Not found User"
    }

    return User.findByIdAndUpdate( req.params.id, { "$set": { "nickname": req.body.nickname, "url": req.body.url } } )
    .then( r => {
      return res.json( { success:"true"} )
    })

  })
  .catch( e => {
    return res.json({success:"false", message:err});
  })
})

router.put('/changeIs3003/:id', isLoggedIn, function(req, res){
  if(req.user._id != req.params.id) return res.json({success:false, message:"Unauthrized Attempt"});

  User.findById( req.params.id )
  .then( r => {
    if( null == r) {
      throw "Not found User"
    }

    return User.findByIdAndUpdate( req.params.id, { "$set": { "is_3003": req.body.is_3003 } } )
    .then( r => {
      return res.json( { success:"true"} )
    })

  })
  .catch( e => {
    return res.json({success:"false", message:err});
  })
})

function isLoggedIn(req, res, next){
  if (req.isAuthenticated()){
    return next();
  }
  res.redirect('/');
}

function checkUserRegValidation(req, res, next){
  var isValid = true;

  async.waterfall(
    [function(callback){
      User.findOne({email: req.body.user.email, _id: {$ne: mongoose.Types.ObjectId(req.params.id)}},
        function(err, user){
          if(user){
            isValid = false;  //여기서 inValid 라고 오타를 쳐서 에러났음 ㅠㅠ 찾는데 꽤 걸림.
            req.flash("emailError", "- This email is already resistered.");
          }
          callback(null, isValid);
        }
      );
    }, function(isValid, callback){
      User.findOne({nickname: req.body.user.nickname, _id: {$ne: mongoose.Types.ObjectId(req.params.id)}},
          function(err, user){
            if(user){
              isValid = false;
              req.flash("nicknameError", "- This nickname is already resistered.");
            }
            callback(null, isValid);
          }
      );
    }], function (err, isValid){
      if(err) return res.json({success:"false", message:err});
      if(isValid){
        return next();
      } else {
        req.flash("formData", req.body.user);
        res.redirect("back");
      }
    }
  );
}

module.exports = router;

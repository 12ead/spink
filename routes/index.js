function initRoutes( app, passport ){

  // route for logging out
  app.get('/logout', function(req, res) {
      req.logout();
      res.redirect('/');
  });

  app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

  // the callback after google has authenticated the user
  app.get('/auth/google/callback',
          passport.authenticate('google', {
                  successRedirect : '/',
                  failureRedirect : '/'
          }));

  //app.use('/', require('./home')); console.log("app.use('/',");//   / 에 도달하면 ./routes/home 개체를 사용하겠다라는 의미 -그런데 실행해보면, 먼저 require를 실행한뒤 app.use 를 실행.
  app.get( '/', function(req, res){
    res.redirect('/spink');
  });

  app.use('/spink', require('./spink')); console.log("app.use('/spink',");
  app.use('/users', require('./users')); console.log("app.use('/users'");//   /users 에 도달하면 ./routes/users 개체를 사용하겠다라는 의미
  //app.use('/login', require('./login')); console.log("app.use('/login'");

  // 위에서 그 개체내에서의 라우트의 주소의 시작은 각각을 상대적 위치로 하여 / 으로 한다.
  // 즉 /users에 유저가 도달하면(솔직히 어디서 출발하여 여기로 도달한 다는 것인 모르겠닼), routes/home 의 개체를 사용하겠다는 것같은데..
  // 여튼, 여기에 도달하면, 불러들인 ./routes/home 파일은 그 내부에서 자신의 위치를 / 로 본다는 뭐 그런 내용.
  // 그렇다 할지라도 ./routes/home (home.js 를 지칭하는 듯 js는 생략가능)에서 render를 하거나 redirect를 하는 경우에는
  // 주소를 모두 다 써야 한다.

}




// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

module.exports = initRoutes

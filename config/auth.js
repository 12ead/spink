// expose our config directly to our application using module.exports

module.exports = {

    'facebookAuth' : {
        'clientID'      : 'your-secret-clientID-here', // your App ID
        'clientSecret'  : 'your-client-secret-here', // your App Secret
        'callbackURL'   : 'http://localhost:8080/auth/facebook/callback'
    },

    'twitterAuth' : {
        'consumerKey'       : 'your-consumer-key-here',
        'consumerSecret'    : 'your-client-secret-here',
        'callbackURL'       : 'http://localhost:8080/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID'      : '1084601978202-701m8vs99jehn09dn51qj057vllp3hm0.apps.googleusercontent.com',
        'clientSecret'  : 'EDOhdW9jqSe5hhmzkqYGbqR7',
        //'callbackURL'   : 'http://12ead.com/auth/google/callback',
        'callbackURL'   : 'http://localhost:3000/auth/google/callback'
    }

};

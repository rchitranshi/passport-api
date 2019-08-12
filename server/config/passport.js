const passport = require('passport'),
      JwtStrategy = require('passport-jwt').Strategy,
      ExtractJwt = require('passport-jwt').ExtractJwt;

// load up the user model
const User = require('../models').users;
var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('Bearer');
jwtOptions.secretOrKey = 'nodeauthsecret';

var strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
  User
  .findOne({where: {id: jwt_payload.id}})
  .then(function(user){
    if (user) {
        next(null, user);
      } else {
        next(null, false);
      }
  })
});

module.exports = strategy;
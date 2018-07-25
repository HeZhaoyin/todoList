const jwt = require('jwt-simple')
const Users = require('../db/model/user')

module.exports = function (req, res, next) {
  var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
  if (token) {
    try {
      var decoded = jwt.decode(token, app.get('jwtTokenSecret'));
      console.log(decoded)
      if (decoded.exp <= Date.now()) {
        res.end('Access token has expired', 400);
      }
      Users.findOne({
        _id: decoded.iss
      }, function (err, user) {
        console.log(user)
        req.user = user;
        next();
      });
      // handle token here
    } catch (err) {
      console.log('错误在这里',err)
      return next();
    }
  } else {
    next();
  }
}
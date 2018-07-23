const jwt = require('jwt-simple')
const Users = require('../db/model/user')

module.exports = function (req, res, next) {
  var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['X-Access-Token'];
  console.log('token是' + token)
  if (token) {
    try {
      var decoded = jwt.decode(token, app.get('jwtTokenSecret'));
      if (decoded.exp <= Date.now()) {
        res.end('Access token has expired', 400);
      }
      Users.findOne({
        _id: decoded.iss
      }, function (err, user) {
        req.user = user;
      });
      // handle token here
      next();
    } catch (err) {
      return next();
    }
  } else {
    next();
  }
}
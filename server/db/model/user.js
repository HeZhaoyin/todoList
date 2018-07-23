const mongoose = require('../index')
const Users = mongoose.model('users', {
  username: String,
  password: String
})
module.exports = Users;
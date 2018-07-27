const mongoose = require('../index')
const todoListSchema = new mongoose.Schema({
  userID: String,
  todoList: [{
    
  }]
})
const todoList = mongoose.model('todoList', todoListSchema)
module.exports = todoList;
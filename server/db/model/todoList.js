const mongoose = require('../index')
const listSchema = new mongoose.Schema({
  title: String,
  content: String,
  type: Number,
  status: Number,
  addTime: {
    type: Date,
    default: Date.now()
  }
})
const todoListSchema = new mongoose.Schema({
  userID: String,
  list: [listSchema]
})
const todoList = mongoose.model('todoList', todoListSchema, 'todoList')
module.exports = todoList;
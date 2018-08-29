const mongoose = require('mongoose')

let db = mongoose.connect('mongodb://todoList:todoList@数据库地址/todoList', {
  useNewUrlParser: true
})

module.exports = mongoose

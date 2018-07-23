const mongoose = require('mongoose')

let db = mongoose.connect('mongodb://todoList:todoList@47.52.192.88:27017/todoList', {
  useNewUrlParser: true
})

module.exports = mongoose
const express = require('express')
const bodyParser = require('body-parser')
const jwt = require('jwt-simple')
const app = express()
const Users = require('./db/model/user')
const jwtauth = require('./user/auth')
app.set('jwtTokenSecret', 'HEZHAOYINTODOLIST');
app.use(bodyParser.json())
var allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*'); //自定义中间件，设置跨域需要的响应头。
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With,X-Access-Token");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  if (req.method == 'OPTIONS') {
    res.send(200) // 快速响应OPIONTS
  }
  next();
};

app.use(allowCrossDomain); //运用跨域的中间件

app.route('/user/:username').get((req, res) => {
  Users.find({
    username: req.params.username
  }, (err, user) => {
    if (user.length !== 0) {
      res.json({
        success: false,
        message: '用户名已被注册'
      })
      return
    } else {
      res.json({
        success: true,
        message: "用户名可用"
      })
      return
    }
  })
})
app.route('/user/:username/:password').get((req, res) => {
  Users.find({
    username: req.params.username,
    password: req.params.password
  }, (err, user) => {
    if (user.length !== 0) {
      var expires = Date.now() + 7 * 24 * 3600 * 1000;
      var token = jwt.encode({
        iss: user.id,
        exp: expires
      }, app.get('jwtTokenSecret'));
      res.json({
        success: true,
        message: '登录成功，欢迎您：' + req.params.username,
        token: token,
        expires: expires,
        user: user
      });
      return
    } else {
      res.json({
        success: false,
        message: '登录失败，用户名或密码错误'
      })
      return
    }
  })
})
app.route('/user').post((req, res) => {
  if (!req.body.username || !req.body.password) {
    res.json({
      success: false,
      message: '传递参数有误'
    })
    return
  }
  Users.find({
    username: req.body.username
  }, function (err, user) {
    if (!err) {
      console.log(user)
      if (user.length === 0) {
        const user = new Users({
          username: req.body.username,
          password: req.body.password
        });
        user.save().then(() => {
          console.log('OK')
          res.json({
            success: true,
            message: '注册成功'
          })
          return
        })
      } else {
        res.json({
          success: false,
          message: '用户名已被注册'
        })
        return
      }
    } else {
      console.log(err)
    }
  })
})
app.get('/todoList', function (req, res) {
  // if (req.user) {
    res.json({
      success: true,
    })
  // } else {
  //   res.json({
  //     success: false,
  //   })
  // }
})

app.listen(4000)
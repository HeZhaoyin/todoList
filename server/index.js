const express = require('express')
const bodyParser = require('body-parser')
const jwt = require('jwt-simple')
const app = global.app = express()
const Users = require('./db/model/user')
const todoList = require('./db/model/todoList')
const jwtauth = require('./user/auth')
const router = express.Router()
app.set('jwtTokenSecret', 'HEZHAOYINTODOLIST');

var allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*'); //自定义中间件，设置跨域需要的响应头。
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With,X-Access-Token");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  if (req.method == 'OPTIONS') {
    res.status(200).send('ok') // 快速响应OPIONTS
  }
  next();
};

app.use(allowCrossDomain); //运用跨域的中间件
app.use(bodyParser.json())

router.route('/user/:username').get((req, res) => {
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
router.route('/user/:username/:password').get((req, res) => {
  console.log('123');
  Users.find({
    username: req.params.username,
    password: req.params.password
  }, (err, user) => {
    if (user.length !== 0) {
      var expires = Date.now() + 7 * 24 * 3600 * 1000;
      console.log(user)
      var token = jwt.encode({
        iss: user[0]._id,
        exp: expires
      }, app.get('jwtTokenSecret'));
      res.json({
        success: true,
        message: '登录成功，欢迎您：' + req.params.username,
        token: token,
        expires: expires,
        user: user[0]
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
router.route('/user').post((req, res) => {
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
router.route('/todoList').post(jwtauth, function (req, res) {

}).get(jwtauth, function (req, res) {
  console.log(req.user)
  if (req.user) {
    res.json({
      success: true,
    })
  } else {
    res.json({
      success: false,
    })
  }
})
app.use(router)
app.listen(4000)
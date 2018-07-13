<template>
  <div class="main-box">
    <transition name="slide-fade">
    <div class="login-box" v-if="type == 'login'" key="login">
      <h1>todoList登录</h1>
      <div class="login-box-item">
        <label for="username">用户名：</label>
        <input type="text" id="username" v-model="loginData.username">
      </div>
      <div class="login-box-item">
        <label for="password">密码：</label>
        <input type="password" id="password" v-model="loginData.password">
      </div>
      <div class="login-box-item">
        <button @click="login">登录</button>
        <button @click="changeType('register')">注册</button>
      </div>
    </div>
    <div class="register-box" v-if="type == 'register'" key="register">
      <h1>todoList注册</h1>
      <div class="login-box-item">
        <label for="username">用户名：</label>
      <input type="text" id="username" v-model="registerData.username" @blur="checkUser">
      </div>
      <div class="login-box-item">
        <label for="password">密码：</label>
        <input type="password" id="password" v-model="registerData.password">
      </div>
      <div class="login-box-item">
        <label for="confirmPassword">确认密码：</label>
        <input type="password" id="confirmPassword" v-model="registerData.confirmPassword">
      </div>
      <div class="login-box-item">
        <button @click="register">确认注册</button>
        <button @click="changeType('login')">返回</button>
      </div>
    </div>
    </transition>
  </div>
</template>

<script>
import * as service from "../service/index.js";

export default {
  name: "index",
  data() {
    return {
      type: "login",
      loginData: {
        username: "",
        password: ""
      },
      registerData: {
        username: "",
        password: "",
        confirmPassword: ""
      }
    };
  },
  methods: {
    changeType: function(type) {
      this.type = type;
    },
    register: function() {
      service
        .register({
          username: this.registerData.username,
          password: this.registerData.password
        })
        .then(res => {
          console.log(res);
        });
    },
    checkUser: function() {
      service
        .checkUser({
          username: this.registerData.username
        })
        .then(res => {
          console.log(res);
        });
    },
    login: function() {
      service.login({
        username: this.loginData.username,
        password: this.loginData.password
      });
    }
  }
};
</script>
<style scoped>
.main-box {
  width: 100%;
  height: 100%;
  position: relative;
}
.login-box,
.register-box {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.login-box-item {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
}
h1 {
  text-align: center;
}
.login-box-item label {
  width: 90px;
  display: inline-block;
}
.login-box-item input {
  border: 1px solid skyblue;
}
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  /* transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1); */
  transition: all 0.3s ease;
}
.slide-fade-enter {
  left: 60%;
  opacity: 0;
}
.slide-fade-leave-to {
  left: 40%;
  opacity: 0;
}
</style>

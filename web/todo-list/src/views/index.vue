<template>
  <div class="main-box">
    <transition name="slide-fade">
    <div class="login-box" v-if="type == 'login'" key="login">
      <h1>todoList登录</h1>
      <Form ref="loginForm" :rules="loginValidate" :model="loginData">
        <FormItem prop="username" required>
          <i-input type="text" v-model="loginData.username" placeholder="用户名">
                <Icon type="ios-person-outline" slot="prepend"></Icon>
            </i-input>
        </FormItem>
        <FormItem prop="password">
            <i-input type="password" v-model="loginData.password" placeholder="密码">
                <Icon type="ios-locked-outline" slot="prepend"></Icon>
            </i-input>
        </FormItem>
        <div class="login-btn-box">
            <Button type="primary" @click="login">登录</Button>
            <Button @click="changeType('register')">注册</Button>
        </div>
      </Form>
    </div>
    <div class="register-box" v-if="type == 'register'" key="register">
      <h1>todoList注册</h1>
      <Form ref="registerForm" :rules="registerValidate" :model="registerData">
        <FormItem prop="username">
          <i-input type="text" v-model="registerData.username" placeholder="用户名">
                <Icon type="ios-person-outline" slot="prepend"></Icon>
            </i-input>
        </FormItem>
        <FormItem prop="password">
            <i-input type="password" v-model="registerData.password" placeholder="密码">
                <Icon type="ios-locked-outline" slot="prepend"></Icon>
            </i-input>
        </FormItem>
        <FormItem prop="confirmPassword">
            <i-input type="password" v-model="registerData.confirmPassword" placeholder="确认密码">
                <Icon type="ios-locked-outline" slot="prepend"></Icon>
            </i-input>
        </FormItem>
        <div class="login-btn-box">
            <Button type="primary" @click="register">注册</Button>
            <Button @click="changeType('login')">返回</Button>
        </div>
      </Form>
    </div>
    </transition>
  </div>
</template>

<script>
import * as service from "../service/index.js";

export default {
  name: "index",
  data() {
    const validateRegisterUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        service
          .checkUser({
            username: this.registerData.username
          })
          .then(res => {
            if (!res.data.success) {
              callback(new Error("用户名已被注册"));
            } else {
              callback();
            }
          });
      }
    };
    const validateRegRePwd = (rule, value, callback) => {
      if (this.registerData.password !== this.registerData.confirmPassword) {
        callback(new Error("两处密码不一致"));
      } else {
        callback();
      }
    };
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
      },
      loginValidate: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
      registerValidate: {
        username: [{ validator: validateRegisterUsername, trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        confirmPassword: [
          { required: true, message: "请重复输入密码", trigger: "blur" },
          { validator: validateRegRePwd, trigger: "change" }
        ]
      }
    };
  },
  methods: {
    changeType: function(type) {
      this.type = type;
      this.loginData = {
        username: "",
        password: ""
      };
      this.registerData = {
        username: "",
        password: "",
        confirmPassword: ""
      };
    },
    register: function() {
      this.$refs.registerForm.validate(valid => {
        if (!valid) {
          this.$Message.error("请输入所有信息");
          return;
        } else {
          service
            .register({
              username: this.registerData.username,
              password: this.registerData.password
            })
            .then(res => {
              console.log(res);
              if (res.data.success) {
                this.$Message.success(res.data.message);
                this.changeType("login");
              } else {
                this.$Message.error(res.data.message);
              }
            });
        }
      });
    },
    login: function() {
      this.$refs.loginForm.validate(valid => {
        console.log(valid);
        if (!valid) {
          this.$Message.error("请输入所有信息");
          return;
        } else {
          service
            .login({
              username: this.loginData.username,
              password: this.loginData.password
            })
            .then(res => {
              if (res.data.success) {
                this.$Message.success(res.data.message);
                localStorage.setItem("userInfo", JSON.stringify({
                  token: res.data.token,
                  user: res.data.user
                }));
                this.$router.push("home");
              } else {
                this.$Message.error(res.data.message);
              }
            });
        }
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
  padding: 50px 120px;
  box-shadow: 1px 4px 20px rgba(0, 0, 0, 0.6);
  border: 1px solid #ccc;
}
h1 {
  text-align: center;
}

.login-btn-box {
  display: flex;
  justify-content: space-around;
  align-items: center;
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

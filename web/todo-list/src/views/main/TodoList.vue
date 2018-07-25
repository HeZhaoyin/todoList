<template>
    <div>
      <div class="main-header">
        <h1>HeZhaoyin's ToDoList</h1>
      </div>
      <div class="todo-list-box" :style="{height:boxHeight + 'px'}">
        <div class="todo-list-type">
          <div class="type-header type-one">紧急 & 重要</div>
          <div class="todo-content" :style="{height:contentHeight + 'px'}">
            <ul>
              <li class="todo-list-item">
                <Checkbox></Checkbox>
                <span>这里是标题</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="todo-list-type">
          <div class="type-header type-two">不紧急 & 重要</div>
          <div class="todo-content" :style="{height:contentHeight + 'px'}">
            <ul>
              <li class="todo-list-item">
                <Checkbox></Checkbox>
                <span>这里是标题</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="todo-list-type">
          <div class="type-header type-three">紧急 & 不重要</div>
          <div class="todo-content" :style="{height:contentHeight + 'px'}">
            <ul>
              <li class="todo-list-item">
                <Checkbox></Checkbox>
                <span>这里是标题</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="todo-list-type">
          <div class="type-header type-four">不紧急 & 不重要</div>
          <div class="todo-content" :style="{height:contentHeight + 'px'}">
            <ul>
              <li class="todo-list-item">
                <Checkbox></Checkbox>
                <span>这里是标题</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
import * as service from "../../service/home.js";
export default {
  name: "todoList",
  data() {
    return {
      boxHeight:(document.documentElement.clientHeight || document.body.clientHeight) - 60
    };
  },
  computed:{
    contentHeight:function(){
      return this.boxHeight / 2 - 100
    }
  },
  mounted: function() {
    window.addEventListener('resize',()=>{
      this.boxHeight = (document.documentElement.clientHeight || document.body.clientHeight) - 60;
    })
    service.getTodoList({}).then(res => {
      console.log(res);
    });
  }
};
</script>

<style>
ul,
li {
  list-style: none;
}
.main-header {
  width: 100%;
  height: 60px;
  background: skyblue;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
}
.todo-list-box {
  padding: 30px;
  display: flex;
  flex-wrap: wrap;
}
.todo-list-type {
  width: 50%;
  padding: 15px;
  border: 1px solid #ccc;
}
.todo-list-item {
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px dashed skyblue;
}
.type-header {
  height: 40px;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}
.type-one {
  background: #ffede7;
  color: #f76333;
}
.type-two {
  background-color: #ffefcb;
  color: #feae6a;
}
.type-three {
  background-color: #d6f4fe;
  color: #3fb6da;
}
.type-four {
  background-color: #efd;
  color: #89c557;
}
.todo-content{
  box-sizing: border-box;
}
</style>

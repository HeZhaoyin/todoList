<template>
    <div>
      <div class="main-header">
        <h1>HeZhaoyin's ToDoList</h1>
      </div>
      <div class="todo-list-box" :style="{height:boxHeight + 'px'}">
        <Modal v-model="isShowAdd" width="450">
          <p slot="header" style="color:#2d8cf0;text-align:center">
            <Icon type="calendar"></Icon>
            <span>新增Todo</span>
          </p>
          <Form :label-width="80">
            <FormItem label="类别：">
              <span class="todo-input-title" :style="{color:todoInputTitleColor}">{{todoInputTitle}}</span>
            </FormItem>
            <FormItem label="标题：">
              <i-input placeholder="请输入Todo标题"></i-input>
            </FormItem>
            <FormItem label="详细内容：">
              <i-input type="textarea" :autosize="{minRows: 3,maxRows: 8}" placeholder="请输入Todo详细内容"></i-input>
            </FormItem>
          </Form>
          <div slot="footer">
              <Button @click="hideAdd">取消</Button>
              <Button type="primary">确认</Button>
          </div>
        </Modal>
        <div class="todo-list-type" :class="type.cssClass" v-for="type in typeList" :key="type.value">
          <div class="type-header">
            <span>{{type.typeName}}</span>
            <Button class="type-add-btn" type="primary" size="small" @click="showAdd(type.value)">
              <Icon type="plus-round"></Icon>
              <span>新增</span>
            </Button>
          </div>
          <div class="todo-content" :style="{height:contentHeight + 'px'}">
            <ul>
              <li class="todo-list-item">
                <Checkbox></Checkbox>
                <span>这里是标题</span>
                <Button class="todo-del-btn" type="error" size="small">删除</Button>
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
      boxHeight:
        (document.documentElement.clientHeight || document.body.clientHeight) -
        60,
      typeList: [
        { value: 1, cssClass: "type-one", typeName: "紧急 & 重要" },
        { value: 2, cssClass: "type-two", typeName: "不紧急 & 重要" },
        { value: 3, cssClass: "type-three", typeName: "紧急 & 不重要" },
        { value: 4, cssClass: "type-four", typeName: "不紧急 & 不重要" }
      ],
      isShowAdd: false,
      addType: 0
    };
  },
  computed: {
    contentHeight: function() {
      return this.boxHeight / 2 - 100;
    },
    todoInputTitleColor: function() {
      switch (this.addType) {
        case 1:
          return "#f76333";
          break;
        case 2:
          return "#feae6a";
          break;
        case 3:
          return "#3fb6da";
          break;
        case 4:
          return "#89c557";
          break;
      }
    },
    todoInputTitle: function() {
      switch (this.addType) {
        case 1:
          return "紧急 & 重要";
          break;
        case 2:
          return "不紧急 & 重要";
          break;
        case 3:
          return "紧急 & 不重要";
          break;
        case 4:
          return "不紧急 & 不重要";
          break;
      }
    }
  },
  mounted: function() {
    window.addEventListener("resize", () => {
      this.boxHeight =
        (document.documentElement.clientHeight || document.body.clientHeight) -
        60;
    });
    service.getTodoList({}).then(res => {
      console.log(res);
    });
  },
  methods: {
    showAdd: function(value) {
      this.addType = value;
      this.isShowAdd = true;
    },
    hideAdd: function() {
      this.isShowAdd = false;
    }
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
  height: 40px;
  font-size: 16px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-bottom: 3px dashed skyblue;
  position: relative;
}
.type-header {
  height: 40px;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  position: relative;
}
.type-one .type-header {
  background: #ffede7;
  color: #f76333;
}
.type-two .type-header {
  background-color: #ffefcb;
  color: #feae6a;
}
.type-three .type-header {
  background-color: #d6f4fe;
  color: #3fb6da;
}
.type-four .type-header {
  background-color: #efd;
  color: #89c557;
}
.type-one .todo-list-item {
  border-color: #ffede7;
  color: #f76333;
}
.type-two .todo-list-item {
  border-color: #ffefcb;
  color: #feae6a;
}
.type-three .todo-list-item {
  border-color: #d6f4fe;
  color: #3fb6da;
}
.type-four .todo-list-item {
  border-color: #efd;
  color: #89c557;
}

.todo-content {
  box-sizing: border-box;
}

.type-add-btn {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translate(0, -50%);
}

.todo-del-btn {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translate(0, -50%);
}

.todo-input-title {
  font-weight: bold;
}
</style>

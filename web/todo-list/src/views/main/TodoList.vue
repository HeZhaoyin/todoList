<template>
    <div>
      <div class="main-header">
        <h1>HeZhaoyin's ToDoList</h1>
        <Button class="quit-btn" @click="quitSystem">退出</Button>
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
              <i-input placeholder="请输入Todo标题" v-model="todoListData.title"></i-input>
            </FormItem>
            <FormItem label="详细内容：">
              <i-input type="textarea" :autosize="{minRows: 3,maxRows: 8}" placeholder="请输入Todo详细内容" v-model="todoListData.content"></i-input>
            </FormItem>
          </Form>
          <div slot="footer">
              <Button @click="hideAdd">取消</Button>
              <Button type="primary" @click="addTodoList">确认</Button>
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
              <li class="todo-list-item" v-for="(list,index) in computedList(type.value)" :key="index">
                <Checkbox></Checkbox>
                <div>
                  <p>{{list.title}}</p>
                  <p class="todo-content">{{list.content}}</p>
                  </div>
                <Button class="todo-modify-btn" type="warning" size="small">编辑</Button>
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
      addType: 0,
      todoListData: {
        title: "",
        content: ""
      },
      typeOneList: [],
      typeTwoList: [],
      typeThreeList: [],
      typeFourList: []
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
    this.getData();
  },
  methods: {
    getData: function() {
      service.getTodoList({}).then(res => {
        console.log(res);
        let listArr = res.data.userTodoList.list;
        this.initList(listArr);
      });
    },
    initList: function(listArr) {
      this.typeOneList = [];
      this.typeTwoList = [];
      this.typeThreeList = [];
      this.typeFourList = [];
      for (let i = 0; i < listArr.length; i++) {
        switch (listArr[i].type) {
          case 1:
            this.typeOneList.push(listArr[i]);
            break;
          case 2:
            this.typeTwoList.push(listArr[i]);
            break;
          case 3:
            this.typeThreeList.push(listArr[i]);
            break;
          case 4:
            this.typeFourList.push(listArr[i]);
            break;
        }
      }
    },
    quitSystem: function() {
      this.$Modal.confirm({
        title: "退出",
        content: "确认退出Todolist系统吗？",
        onOk: () => {
          this.$router.push("/");
        }
      });
    },
    showAdd: function(value) {
      this.addType = value;
      this.isShowAdd = true;
    },
    hideAdd: function() {
      this.isShowAdd = false;
    },
    addTodoList: function() {
      service
        .addTodoList({
          title: this.todoListData.title,
          content: this.todoListData.content,
          type: this.addType
        })
        .then(res => {
          console.log(res);
          if (res.data.success) {
            this.$Message.success(res.data.message);
            this.getData();
            this.hideAdd();
          }
        });
    },
    computedList: function(type) {
      switch (type) {
        case 1:
          return this.typeOneList;
          break;
        case 2:
          return this.typeTwoList;
          break;
        case 3:
          return this.typeThreeList;
          break;
        case 4:
          return this.typeFourList;
          break;
      }
    }
  }
};
</script>

<style>
ul,
li {
  list-style: none;
}
.quit-btn {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translate(0, -50%);
}
.main-header {
  width: 100%;
  height: 60px;
  background: skyblue;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  position: relative;
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

.todo-modify-btn{
  position: absolute;
  right: 60px;
  top: 50%;
  transform: translate(0,-50%);
}

.todo-input-title {
  font-weight: bold;
}

.todo-content{
  color: #8a8a8a;
  font-size: 14px;
}
</style>

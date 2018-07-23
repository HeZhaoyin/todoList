<template>
    <div>
      123
    </div>
</template>
<script>
import * as service from "../../service/home.js";
export default {
  name: "todoList",
  data() {
    return {};
  },
  mounted: function() {
    service.getTodoList({}).then(res => {
      console.log(res);
    });
  }
};
</script>


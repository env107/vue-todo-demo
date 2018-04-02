<template>
  <div>
      <div v-for="(todo,index) in todos" :key="todo.id" class="todo-item">
          <todo-item v-bind="todo" :index="index"></todo-item>
      </div>
      
  </div>
</template>
<script>
import TodoItem from "./TodoItem.vue";
export default {
  name:"todolist",
  props:['todos'],
  components:{TodoItem},
  data:function(){

    return {};
  }
}
</script>
<style lang="less">

</style>





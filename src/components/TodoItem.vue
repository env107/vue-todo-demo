<template>
  <div>
      <el-checkbox @change="saveTodo" :checked="done">{{ name }}</el-checkbox>
  </div>
</template>

<script>
import {ADD_TODO,SAVE_TODO,FILTER_TODO} from "../maps/eventlist";
export default {
    name:"todoitem",
    props:["done","name","index"],
    data:function(){
        return {};
    },
    methods:{
        saveTodo:function(){
            var index = this.index;
            this.$store.dispatch({
                type:SAVE_TODO,
                index:index,
            })
        }
    }
}
</script>

<style>

</style>

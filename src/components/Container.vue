<template>
<div >
  <Header />
  <div class="content" >
    <div class="c-title">输入Todo事项：</div>
    <el-row  :gutter="5" >
      <el-col :span="15">
        <el-input placeholder="输入Todo" clearable v-model="todoname" />      
      </el-col>
      <el-col :span="6" >
        <el-button type="primary" @click="addTodo" >添加</el-button>
        <el-button @click="findTodo">搜索</el-button>
      </el-col>
    </el-row>
    <el-row style="margin-top:10px;">
      <el-col >
        <el-tag v-for="(tag,index) in findtag" :key="index" @close="closeTodo(index)"  closable style="margin-right:5px;">
          {{ tag }}
        </el-tag>
      </el-col>
    </el-row>
    <el-row style="margin-top:10px;">
      <el-col :span="2" >
        过滤：
      </el-col>
      <el-col :span="14">
        <el-radio @change="filterTodo" v-model="filter" label="all">全部</el-radio>
        <el-radio @change="filterTodo" v-model="filter" label="undone">未完成</el-radio>
        <el-radio @change="filterTodo" v-model="filter" label="done">已完成</el-radio>
      </el-col>
    </el-row>
    <el-row style="margin-top:10px;">
      <el-col :span="15" >
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>Todo事务项</span>
          </div>
          <todo-list v-bind:todos="todolist" v-loading="loading"></todo-list>
        </el-card>
      </el-col>
    </el-row>

  </div>
</div>
</template>

<script>
import Header from "./Header.vue";
import TodoList from "./TodoList.vue";
import {ADD_TODO,SAVE_TODO,FILTER_TODO,FIND_TODO,CLOSE_TODO} from "../maps/eventlist";

export default {
  name: 'container',
  components:{Header,TodoList},
  mounted:function(){
    this.$nextTick(function(){
          this.$store.dispatch({
            type:"getData"
          });
          
    });
   

  },
  computed:{
    //计算属性，通过过滤方式获得列表
      todolist:function(context){
        this.loading = true;
        setTimeout(function(){
            this.loading = false;
          }.bind(this),300);
         return context.$store.getters.todolist;
      },
      findtag:function(context){
        return context.$store.state.todolist.find;
      }
  },
  data:function(){
    return {
      todos:this.todolist,
      filter:this.$store.state.todolist.filter,
      todoname:'',
      loading:true,
    }
  },
  methods:{
    //添加todo
    addTodo:function(){
      var todoname = this.todoname;
      var index = this.$store.state.todolist.todos.length + 1;
      if(todoname == ''){
        this.$message("请输入Todo事务项");
        return false;
      }
      var todo = {
        id:index,
        done:false,
        name:todoname
      };     
      this.$store.dispatch({
        type:ADD_TODO,
        todo,
      });
      this.todoname = '';
    },
    //todo过滤器
    filterTodo:function(filter){
      this.$store.dispatch({
        type:FILTER_TODO,
        filter
      })
    },
    //索引todo
    findTodo:function(){
      var todoindex = this.todoname;
      if(todoindex == ''){
        this.$message("搜索项不能为空！");
        return false;
      }
      this.$store.dispatch({
        type:FIND_TODO,
        find:todoindex
      });
      this.todoname = '';
    },
    //删除todo索引
    closeTodo:function(index){
      this.$store.dispatch({
        type:CLOSE_TODO,
        index:index
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.c-title{
  line-height: 35px;
}
.content{
  margin:10px 0 20px 15px;
}
</style>

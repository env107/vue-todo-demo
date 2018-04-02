import Vuex from "vuex";
import Vue from "vue";
import {ADD_TODO,SAVE_TODO,FILTER_TODO,FIND_TODO,CLOSE_TODO} from "../maps/eventlist";
Vue.use(Vuex);

Array.prototype.valueOf = function(value){
    var rs = false;
    //搜索
    this.forEach(function(o){  
     if(value.indexOf(o)>=0){
           rs = true;
        }
    });
    return rs;   
}

const version = {
    state:{
        title:"build",
        text:"1.0.0"
    },
    getters:{
        desc(state){
            return state.title + " on " + state.text;
        }
    }
}

const todolist = {
    state:{
        todos:[],
        filter:"all",
        find:[]
    },
    mutations:{
        [ADD_TODO](state,payload){
            state.todos.push(payload.todo);
        },
        [SAVE_TODO](state,payload){
            state.todos.forEach(function(todo,index){
                if(index == payload.index){
                    todo.done = !todo.done
                }
            }); 
          
        },
        [FILTER_TODO](state,payload){
            state.filter = payload.filter;
        },
        [FIND_TODO](state,payload){
            if(payload.find == '' || state.find.includes(payload.find)){
                return false;
            }
            state.find.push(payload.find);
        },
        [CLOSE_TODO](state,payload){
            let index = payload.index;
            if(index >= 0){
                state.find.splice(index,1);
            }
        }
    },
    actions:{
        [ADD_TODO](context,payload){
           context.commit({
                type:payload.type,
                todo:payload.todo
           })
        },
        [SAVE_TODO](context,payload){
            context.commit({
                type:payload.type,
                index:payload.index
            });
        },
        [FILTER_TODO](context,payload){
            context.commit({
                type:payload.type,
                filter:payload.filter
            })
        },
        [FIND_TODO](context,payload){
          context.commit({
              type:payload.type,
              find:payload.find
          })
        },
        [CLOSE_TODO](context,payload){
            context.commit({
               type:payload.type,
               index:payload.index
            })
        },
        getData(context,payload){
            //可以从请求数据中获取初始化数据
            context.state.todos = [];
            context.state.todos.push({id:"1",name:"Todo1",done:false});
            context.state.todos.push({id:"2",name:"Todo2",done:true});
            context.state.todos.push({id:"3",name:"Todo3",done:true});
            context.state.todos.push({id:"4",name:"Todo4",done:false});
            context.state.todos.push({id:"5",name:"Todo5",done:true});
            context.state.todos.push({id:"6",name:"Todo6",done:false});
        }
        
    },
    getters:{
        todolist(state){  
            
            var list = state.todos;
            //关键字过滤
            if(state.find.length > 0){
                var filter_list = list.filter((todo)=>{
                    return state.find.valueOf(todo.name);
                });
                list = filter_list;
            }
            //状态过滤
            if(state.filter != "all"){
                var filter_list = list.filter((todo)=>{
                    if(state.filter == "undone"){
                        return todo.done == false;
                    }
                    if(state.filter == "done"){
                        return todo.done == true;
                    }
                });
                list = filter_list; 
            }   
            return list;
        },
    },
}



const store = new Vuex.Store({
    modules:{
        version,
        todolist
    },

});

export default store;
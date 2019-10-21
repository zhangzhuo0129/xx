import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
var store = new Vuex.Store({
    state:{
        history:JSON.parse(localStorage.getItem("history"))||[],
        city:JSON.parse(localStorage.getItem("city"))||[],
        list:[]
    },
    mutations:{
        city(state,item){
            state.city = item
            console.log(state.city)
        },
        add(state,v){
           var index = state.history.findIndex((item,i)=>{
                return item == v
           })
           if(index == -1){
               state.history.push(v)
           }
        },
        del(state,i){
            state.history.splice(i,1)
        },
        del2(state){
            state.history=[]
        },
        jia(state,v){
            var index = state.list.findIndex((item,i)=>{
                return item.name == v.name
            })
            console.log(index)
            if(index==-1){
                state.list.push(v)
            }
        },
        jian(state,item){
            if(item.v.__v>0){
                item.v.__v--
            }else{
                state.list.splice(item.i,1)
            }
        },
        del(state){
            state.list.map((v,i)=>{
                return v.__v=0
            })
            state.list=[]
        }
    },
    getters:{
        price(state){
            var sum = 0
            state.list.map((v,i)=>{
                sum+=v.specfoods[0].price*v.__v
            })
            return sum
        },
        sum(state){
            var s = 0
            state.list.map((v,i)=>{
                s+=v.__v
            })
            return s
        }
    }
})
store.subscribe(function(mutations,state){
    localStorage.setItem("city",JSON.stringify(state.city))
    localStorage.setItem("history",JSON.stringify(state.history))
})
export default store
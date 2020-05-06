import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
var store = new Vuex.Store({
    state:{
        userToken:document.cookie.split("=")[1] || ''
        // name:"niaho"
    }
})
export default store
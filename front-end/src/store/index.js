import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)

import state from './state'

const mutations = {
    setLoginUserData(state, payload){
        state.nowLoginUserData = payload
    },

    login(state) {
        state.islogin = true
        state.showBtTab = true;
    },
    logout(state){
        state.nowLoginUserData = {}
        state.islogin = false
        state.showBtTab = false;
    },

    btBackView(state, payload){
        state.showGoBack = payload.boo;
    },

    btTabView(state, payload){
        state.showBtTab = payload.boo;
    },

    addNewFlag(state, payload){
        let newdata = {
            flagName: payload,
            isFinished: false
        }
        //state.nowLoginUserData.todayFlag.push(newdata)
    },

    setFriendInfo(state, payload) {
        state.friendInfo = payload;
    },

    setThemeStr(state, payload){
        state.themeStr = payload;
    }
}

const store = new Vuex.Store({
    state,
    mutations

})

export default store;
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'

import Mint from 'mint-ui';
import 'mint-ui/lib/style.css'
Vue.use(Mint);

import App from './App'

import store from './store/index.js'

import axios from 'axios'
Vue.prototype.$http = axios

Vue.config.productionTip = false

// 导航守卫
// router.beforeEach((to, from, next) => {
  
//   let user = state.nowLoginUserID
//   if (user == '' ) {
//     // next({ path: '/' })
//     console.log(1)
//     // router.push({ name: 'login' })
//   } else {
//     next()
//   }
// })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

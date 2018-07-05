<template>
    <div id="app">
      <router-view></router-view>
      <xs-head>
        <img src="./assets/bt/back.png" height="18px" style="position:absolute; left:10px; margin:11px 0;"
             @click="$router.go(-1)" v-if="showGoBack"
        />
        <img src="./assets/Flag.png" height="24" style="margin: 8px 0;">
        <router-link to="/login" v-if="!islogin">登录</router-link>
        <a href="javascript:;" @click="logout()" v-if="islogin">注销</a>
      </xs-head>
      <xs-cell :height="60" pos="bottom" style="margin-bottom: 5px;"
        v-if="showBtTab"
      >
        <bt-tab></bt-tab>
      </xs-cell>
    </div>
</template>

<script>
import xsCell from '@/components/design/cell'
import xsHead from '@/components/design/headLine'
import btTab from '@/components/bottomRouter/btTab'

import state from 'vuex'
import {mapState} from 'vuex'

export default {
  name: 'App',
  data() {
    return {
    }
  },
  methods:{
      logout:function(){
          this.$store.commit('logout')
          this.$router.push('/login')
      }
  },
  computed: {
    ...mapState({
      islogin: 'islogin',
      showBtTab: 'showBtTab',
      showGoBack: 'showGoBack'
    })
  },
  components: { xsCell, xsHead, btTab }
}
</script>

<style>
input{
  outline:none;
  -webkit-tap-highlight-color: #fff;
}
input,textarea{
	outline: none;
	border:none;
	resize: none;
	-webkit-appearance:none;
}
* {
  padding: 0;
  margin: 0;
}

body {
  background-color: #ffeee0;
  overflow: hidden;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

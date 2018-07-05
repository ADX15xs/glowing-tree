<template>
    <div class="login">
        <img src="../../assets/set/login_bg.jpg" alt="" width="100%">
        <div class="warp">
            <div class="userid inputcss">
                <input type="text" v-model="userID" placeholder="请输入账号" @keydown='keyToLogin($event)'>
            </div>
            <div class="pwd inputcss">
                <input type="password" v-model="pwd" placeholder="请输入密码" @keydown='keyToLogin($event)'>
            </div>
            <div class="loginBtn btn">
                <a href="javascript:;" @click="login()">登录</a>
            </div>
            <div class="regBtn btn">
                <router-link to="/register">注册</router-link>
            </div>
            <div class="copyRight">
                <p>天坑小队出品</p>
                <p>Copyright@2017-2018 Sinkhole</p>
                <p>All Right Reserved</p>
            </div>
        </div>
        
    </div>
</template>

<script>
import xsCell from '@/components/design/cell'

import state from 'vuex'
import {mapState} from 'vuex'

import { Toast, Indicator } from 'mint-ui';

export default {
    data(){
        return{
            userID:'',
            pwd:''
        }
    },
    components:{ xsCell },
    methods:{
        keyToLogin: function (ev) {
            //console.log(ev.keyCode)
            //- 回车登录
            if(ev.keyCode == 13) this.login();
        },
        login: function() {
            if(this.userID === '' || this.pwd === ''){
                Toast({ message: '账号或密码不能为空', duration: 1500 });
            }
            else{
                Indicator.open({
                    text: '登录中...',
                    spinnerType: 'triple-bounce'
                });
                this.$http({
                    method: "post",
                    url: "http://"+ this.serverURL +"/login",
                    data: {
                        userID: this.userID,
                        pwd: this.pwd
                    }
                }).then(response => {
                    //判断数据类型;
                    if(response.data instanceof Array) {
                        Indicator.close();
                        
                        this.$store.commit('setLoginUserData', response.data[0]);
                        Toast({ message: this.loginUser+' 登陆成功!', duration: 1500 });

                        setTimeout(() => {
                            //- Array 则将第一个元素放入用户数据
                            this.$store.commit('login');
                            this.$router.push('/');
                        }, 2000);
                    }else{
                        Indicator.close();
                        //- String 为错误提示 需弹出警告
                        Toast({ message: response.data, duration: 2000 });
                    }
                }).catch(error => {
                    console.log(error);
                });
           }
        }
    },
    computed:{
        ...mapState({
            loginUser: state => state.nowLoginUserData.name,
            islogin: 'islogin',
            serverURL: 'serverURL'
        })
    },
    mounted:function(){
        this.$store.commit('btBackView', {boo: false});
    }
}


</script>

<style scoped>
.login{ 
    width: 100%;
    height: 100%;
    /* background-image: url('../static/images/login_bg.jpg') no-repeat; */
    background-size:100% 100%;
}

.warp{
    width: 100%;
    height: 300px;
    position: fixed;
    bottom: 80px;
    padding-top: 30px;
}
.btn{
    width: 50%;
    height: 45px;
    background: #dfc594;
    color: #000;
    text-align: center;
    line-height: 45px;
    border-radius: 3px;
    margin: 0 auto;
}
.btn a{
    text-decoration: none;
    color: #000;
    font-weight: bold;
    display: block;
    width: 100%;
    height: 45px;
}

.loginBtn{
   position: fixed;
   bottom: 225px;
   left: 25%;
}
.regBtn{
    position: fixed;
   bottom: 160px;
   left: 25%;
}

.inputcss{
    width: 50%;
    height: 40px;
    margin: 0 auto;

}
.inputcss input{
    width: 100%;
    height: 30px;
    border-radius: 5px;
    padding-left: 5px;
    opacity: 0.8
}
.copyRight{
    min-width: 50%;
    position: fixed;
    left: 25%;
    bottom: 80px;
    color: rgb(223, 223, 223);
    font-size: 10px;
    line-height: 16px
}
</style>





















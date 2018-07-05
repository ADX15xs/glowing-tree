<template>
    <div class="reg">
        <img src="../../assets/set/login_bg.jpg" alt="" width="100%">
        <div class="regWarp">
            <div class="userName con">
                <label for="username">昵称：</label>
                <input type="text" v-model="username" name="username" id="username" placeholder="中文、英文、数字" @keydown='keyToReg($event)'>
            </div>
            <div class="flagID con">
                <label for="flagID">Flag ID：</label>
                <input type="text" v-model="flagID" name="flagID" id="flagID" placeholder="3-20位字母或数字" @keydown='keyToReg($event)'>
            </div>
            <div class="password con">
                <label for="password">密码：</label>
                <input type="password" v-model="password" name="password" id="password" placeholder="6-16位字母、数字或符号" @keydown='keyToReg($event)'>
            </div>
            <div class="rePassword con">
                <label for="rePassword">确认密码：</label>
                <input type="password" v-model="rePassword" name="rePassword" id="rePassword" placeholder="请再次输入密码" @keydown='keyToReg($event)'>
            </div>
        </div>
        <div class="regBtn1">
            <a href="javascript:;" @click="gotoreg()">注册</a>
        </div>
    </div>
</template>

<script>
import state from 'vuex'
import {mapState} from 'vuex'

import { Toast, Indicator } from 'mint-ui';

export default {
    data(){
        return{
            username:'',
            flagID:'',
            password:'',
            rePassword:''
        }
    },
    computed:{
        ...mapState({
            serverURL: 'serverURL'
        })
    },
    methods:{
        keyToReg: function (ev) {
            //console.log(ev.keyCode)
            //- 回车注册
            if(ev.keyCode == 13) this.gotoreg();
        },
        gotoreg:function(){
            let a=this.username;
            let b=this.flagID;
            let c=this.password;
            let d = this.rePassword;
            if(a && b && c &&d){
                Indicator.open({
                    text: '注册中...',
                    spinnerType: 'triple-bounce'
                });
                if(c === d) {
                    this.$http({
                        method: "post",
                        url: "http://"+ this.serverURL +"/register",
                        data: {
                            name: a,
                            userID: b,
                            pwd: c,
                            imgUrl: this.getRandomUserImg(17),
                            flags: []
                        }
                    }).then(response => {
                        //console.log(response);
                        Indicator.close();
                        Toast({ message: response.data, duration: 1500 });
                        setTimeout(() => {
                            this.$router.push('/login');
                        }, 2000);
                    }).catch(error => {
                        console.log(error);
                    });
                }
                else Toast({ message: '密码不一致', duration: 1500 });
            }
            else if(!a) Toast({ message: '请输入用户名', duration: 1500 });
            else if(!b) Toast({ message: '请输入登录id', duration: 1500 });
            else if(!c) Toast({ message: '请输入密码', duration: 1500 });
            else if(!d) Toast({ message: '请再次输入密码', duration: 1500 });
        },
        getRandomUserImg: (iTotal) => {
            let imgIdx = Math.ceil( Math.random() * iTotal);
            if(imgIdx < 10) imgIdx = '0'+imgIdx;
            else imgIdx = String(imgIdx);

            return imgIdx;
        }
    },
    mounted:function(){
        this.$store.commit('btBackView', {boo: false});
    }
}
</script>

<style>
.reg{
    width: 100%;
    height: 100%;
    background-size:100% 100%;
}

.regWarp{
    position: fixed;
    left: 10%;
    top: 130px;
    width: 80%;
    height: 335px;
    background-color: #fff;
    opacity: 0.8;
    /* margin: 0 auto; */
    border-radius: 8px;
    padding-top: 20px;
    /* -moz-box-shadow: 10px 10px 5px #f3f4f6; 老的 Firefox
    box-shadow: 10px 10px 5px #f3f4f6; */
}
.con{
    width: 70%;
    height: 60px;
    margin: 0 auto;
    text-align: left;
    color: #4c2516;
    margin-top: 5px;
}
.con label{
    font-weight: bold;
}
.con input{
    width: 100%;
    height: 30px;
    border-bottom: 1px solid #4c2516;
}

.regBtn1{
    width: 50%;
    height: 40px;
    background-color: #dfc594;
    position: fixed;
    top: 465px;
    left: 25%;
    border-radius: 5px;
    line-height: 40px;
}

.regBtn1 a{
    display: block;
    text-decoration: none;
    color: #4c2516;
    font-weight: bold;
}

</style>

<template>
    <div class="detailed">
        <xs-scroll>
            <xs-cell :height="400" style="position:relative;">
                <br><br>
                <input type="text" class="addFlagInput" placeholder="请在此输入Flag..." v-model="userInput" @keydown='keyToAdd($event)' /><br><br>
                <input type="button" class="addButton" value="添加" @click="addFlag(userInput)">
                <br><br>
                <ul>
                    <li v-for="(str,i) in flagList" :key="i" class="listLi">
                        {{ str.flagName }}
                        <span class="x" @click="deleteOne(i)">X</span>
                    </li>
                </ul>
                <br><br><br><br>
                <div id="buttonArray">
                    <input type="button" class="addButton" style="background-color:#ec6e52;" value="取消" @click="clearList">
                    <input type="button" class="addButton" style="background-color:#00a200" value="提交" @click="submitFlag">
                </div>
            </xs-cell>
        </xs-scroll>
    </div>
</template>

<script>
import xsCell from '@/components/design/cell'
import xsScroll from '@/components/design/scrollBox'

import state from 'vuex'
import {mapState} from 'vuex'

import { Toast, Indicator } from 'mint-ui';

export default {
    name: 'detailed',
    data(){
        return{
            userInput: '',
            flagList: [],
        }
    },
    components:{  xsCell, xsScroll },
    methods: {
        goToSet:function() {
            this.$router.go(-1);
            this.$store.commit('btTabView')
        },
        keyToAdd: function (ev) {
            //console.log(ev.keyCode)
            //- 回车添加
            if(ev.keyCode == 13) this.addFlag(this.userInput);
        },
        addFlag:function(str) {
            if(str){
                //console.log('正在添加flag：'+str);
                //- 添加到flag列表
                this.flagList.push({
                    'flagName': str,
                    "isFinished": false
                });
                //- 清空用户输入
                this.userInput = '';
            }
        },
        deleteOne:function(i) {
            this.flagList.splice(i,1);
        },
        clearList:function() {
            this.userInput = '';
            this.flagList = [];
        },
        submitFlag:function() {
            if(this.flagList.length > 0) {
                //console.log('正在提交修改');
                Indicator.open({
                    text: '正在提交修改...',
                    spinnerType: 'double-bounce'
                });
                this.$http({
                    method: "post",
                    url: "http://"+ this.serverURL +"/add_flag",
                    data: {
                        userID: this.loginUserDate.userID,
                        name: this.loginUserDate.name,
                        flagList: this.flagList
                    }
                }).then(response => {
                    if(response.data.succeed) {
                        Indicator.close();
                        Toast({ message: '成功添加 '+response.data.countFlags+' 条flag', duration: 2000 });
                        //console.log(response.data.newUserData);
                        this.$store.commit('setLoginUserData', response.data.newUserData);
                        this.flagList = [];
                    }
                }).catch(error => {
                    console.log(error);
                });
            }
        }
    },
    computed:{
        ...mapState({
            loginUserDate: state => state.nowLoginUserData,
            islogin: 'islogin',
            serverURL: 'serverURL'
        })
    },
    mounted:function(){
        //if(!this.$state.islogin) this.$router.push('/login')
        this.$store.commit('btBackView', {boo: true});
    }
}
</script>

<style scoped>
.listLi {
    position: relative;
    padding-left: 20px;
    width: 235px;
    margin: 10px calc((100% - 255px) / 2);
    list-style-type: none;
    text-align: left;
    font-size: 18px;
}
    .listLi .x {
        position: absolute;
        font-weight: bold;
        color: #ec6e52;
        right: 20px;
    }
.addFlagInput {
    height:30px;
    width:280px;
    font-size:18px;
    text-align:center;
    background-color:transparent;
    border-bottom: 1px solid #333;
}
.addButton {
    height:30px;
    width: 65px;
    padding:0 5px;
    font-size:14px;
    border-radius: 3px;
    line-height: 30px;
    box-shadow: 0px 2px 5px #aaa;
}
#buttonArray .addButton {
    margin: 0 30px;
    color: white;
}
#buttonArray {
    position: absolute;
    bottom: 0;
    margin: 18px calc((100% - 255px) / 2);
}
</style>

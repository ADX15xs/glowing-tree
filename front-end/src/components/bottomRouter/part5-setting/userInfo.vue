<template>
    <div class="userInfo">
        <xs-scroll>
            <xs-cell :height="100">
                <label class="setTital">修改昵称：</label>
                <input type="text" class="nameInput" />
                <input type="button" value="确认" class="nameChangeButton" style="color: white;" />
            </xs-cell>
            <xs-cell :height="100">
                <label class="setTital">隐私设置：</label>
                <div class="selfSetItem">
                    <span class="selfSetFont">不让好友看到我的详细Flag</span>
                    <span class="x">X</span>
                </div>
                <div class="selfSetItem">
                    <span class="selfSetFont">不让陌生人通过FlagID搜索到我</span>
                    <span class="x">X</span>
                </div>
                <div class="selfSetItem">
                    <span class="selfSetFont">隐藏FlagID在好友页面的展示</span>
                    <span class="x">X</span>
                </div>
                <br>
            </xs-cell>
        </xs-scroll>
    </div>
</template>

<script>
import xsCell from '@/components/design/cell'
import xsScroll from '@/components/design/scrollBox'

import state from 'vuex'
import {mapState} from 'vuex'

export default {
    name: 'userInfo',
    data(){
        return{

        }
    },
    components:{  xsCell, xsScroll },
    methods: {
        goToSet:function() {
            this.$router.go(-1);
            this.$store.commit('btTabView', {boo: true});
        }
    },
    mounted:function(){
        //if(!this.$state.islogin) this.$router.push('/login')
        this.$store.commit('btBackView', {boo: true});
    },
    computed:{
        ...mapState({
            
        })
    }
}
</script>

<style scoped>
.setTital {
    display: block;
    width: 95%;
    height: 56px;
    line-height: 56px;
    padding-left: 5%;
    font-size: 20px;
    font-weight: bold;
    text-align: left;
}
.nameInput {
    height:30px;
    width:220px;
    font-size:18px;
    text-align:center;
    background-color:transparent;
    border-bottom: 1px solid #000;
}
.nameChangeButton {
    line-height: 30px;
    height:30px;
    width: 65px;
    padding:0 5px;
    font-size:14px;
    border-radius: 3px;
    box-shadow: 0px 2px 5px #aaa;
    background-color: #00a200;
    margin-left: 10px;
}
.selfSetItem {
    position: relative;
    width: 92%;
    margin: 15px 4%;
    text-align: left;
    font-size: 16px;
}
    .selfSetItem .x {
        line-height: 21px;
        position: absolute;
        font-weight: bold;
        color: #ec6e52;
        right: 20px;
    }
</style>

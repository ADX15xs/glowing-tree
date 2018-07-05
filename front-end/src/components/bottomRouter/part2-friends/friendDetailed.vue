<template>
    <div class="friendDetailed">
        <xs-scroll cut="77px">
            <xs-cell>
                <div class="today">
                    <div class="today_title">
                        <p>今日Flag</p>
                        <p v-if="friendInfo.todayFlag">{{ getFormatDate(friendInfo.todayFlag.date, '-') }}</p>
                        <p v-else>0000-00-00</p>
                    </div>
                    <div style="clear:both"></div>
                    <div class="time">
                        <p v-if="friendInfo.todayFlag">制定时间:{{ friendInfo.todayFlag.setTime }}</p>
                        <p v-else>制定时间:00:00</p>
                        <p v-if="friendInfo.todayFlag">检查时间:{{ friendInfo.todayFlag.checkTime }}</p>
                        <p v-else>检查时间:00:00</p>
                    </div>
                    <div class="flagList">
                        <ul v-if="friendInfo.todayFlag">
                            <li v-for="(n,index) in friendInfo.todayFlag.dateFlag" :key="index">
                                <div class="flagInfo">
                                    <p class="flagTitle">{{ n.flagName }}</p>
                                    <span v-if="n.isFinished"><a><img src="../../../assets/bt/true.jpg" width="20" alt=""></a></span>
                                    <span v-else><a><img src="../../../assets/bt/false.jpg" width="20" alt=""></a></span>
                                </div>
                            </li>
                            
                        </ul>
                        <div v-else>暂无数据</div>
                    </div>
                    <div class="finish_percent">
                        <p v-if="friendInfo.todayFlag">完成度：{{ getFinishPercentage(friendInfo.todayFlag.dateFlag) }}</p>
                        <p v-else>完成度：0.00%</p>
                    </div>
                </div>
            </xs-cell>
            
        </xs-scroll>
        <xs-cell pos="top">
            <div class="user">
                <div class="userimg">
                    <img :src="'./static/user/'+friendInfo.imgUrl+'.png'" width="44" style="margin-top: 6px;">
                </div>
                <div class="userinfo">
                    <p class="username">{{friendInfo.name}}</p>
                </div>
            </div>
        </xs-cell><!-- userCell end -->
    </div>
</template>

<script>
import xsCell from '@/components/design/cell'
import xsScroll from '@/components/design/scrollBox'

import state from 'vuex'
import {mapState} from 'vuex'

export default {
    name: 'friendDetailed',
    data(){
        return{
            friendInfo: {}
        }
    },
    components:{  xsCell, xsScroll },
    methods: {
        goToSet:function() {
            this.$router.go(-1);
            this.$store.commit('btTabView', {boo: true});
            this.$store.commit('setFriendInfo', {});
        },
        getFormatDate: function(date, seperator1) {
            var year = date.substring(0,4);
            var month = date.substring(4,6);
            var strDate = date.substring(6,8);

            var currentdate = year + seperator1 + month + seperator1 + strDate;
            return currentdate;
        },
        getFinishPercentage: (dateFlag) => {
            let count = 0;
            let percentage = '';

            if(!dateFlag) percentage = '0.00%';
            else{
                let l = dateFlag.length;
                for(let i=0; i<l; i++) {
                    if(dateFlag[i].isFinished) count += 1
                }
                percentage = (Math.round((count/l) * 10000)/100).toFixed(2) + '%';
            }
            return percentage;
        }
    },
    mounted:function(){
        //if(!this.$state.islogin) this.$router.push('/login')
        this.$store.commit('btBackView', {boo: true});

       this.friendInfo = this.stateFriendInfo;
    },
    computed:{
        ...mapState({
            stateFriendInfo: 'friendInfo'
        })
    }
}
</script>

<style scoped>
*{
    -moz-box-sizing: border-box;  
    -webkit-box-sizing: border-box; 
    -o-box-sizing: border-box; 
    -ms-box-sizing: border-box; 
}

.today_title{
    height: 35px;
}

.today .today_title p{
    width: 50%;
    float: left;
}
.today .time{
    margin-bottom: 10px;
    height: 30px;
}
.today .time p{
    width: 50%;
    float: left;
    font-size: 12px;
}

.today .today_title p:nth-child(1){
    text-align: left;
    padding-left: 5%;
    margin-top: 10px;
    font-weight: bold;
}

.today .today_title p:nth-child(2){
    text-align: right;
    padding-right: 5%;
    margin-top: 10px;  
}


.today .time p:nth-child(1){
    text-align: left;
    padding-left: 5%;
    margin-top: 10px;
}

.today .time p:nth-child(2){
    text-align: right;
    padding-right: 5%;
    margin-top: 10px;  
}

.user .userimg{
    width: 56px;
    height: 56px;
    border-radius: 50%;
    margin: 6px 10px 6px 20px;
    background-color: #e5a795;
    float: left;
}

.user .userinfo{
    height: 48px;
    margin: 10px 0 10px 10px;
    float: left;
}

.user .userinfo p{
    text-align: left;
    line-height: 24px;
    font-weight: bold;
    color: #642e19;
}

.flagList{
    clear: both;
}

.flagList ul{
    padding: 0
}

.flagList ul li{
    list-style: none;
    height: 30px;
}

.flagList ul li .flagInfo p{
    width: 50%;
    float: left;
    line-height: 30px;
    text-align: left;
    padding-left: 5%;
    color: #642e19;
    font-weight: bold;
    font-size: 15px;
}

.flagList ul li .flagInfo span{
    display: block;
    width: 50%;
    height: 30px;
    padding-top: 5px;
    float: left;
    text-align: right;
    padding-right: 40px;
}

.finish_percent p{
    text-align: left;
    padding-left: 5%;
    padding-top: 15px;
    padding-bottom: 10px;
    font-size: 14px;
}

.newFlag{
    width: 100%;
    height: 35px;
}

.newFlag a{
    display: block;
    width: 100%;
    height: 35px;
    line-height: 35px;
    text-align: right;
    padding-right: 40px;
    float: left;
}
</style>

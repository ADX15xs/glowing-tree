<template>
    <div class="flag">
        <xs-scroll cut="77px">
            <xs-cell v-for="flagsIdx in flagsLen" :key="flagsIdx">
                <div class="today">
                    <div class="today_title">
                        <p v-if="nowDate == allFlags[flagsLen-flagsIdx].date">今日Flag</p>
                        <p v-else-if="nowDate-1 == allFlags[flagsLen-flagsIdx].date">昨日Flag</p>
                        <p v-if="nowDate-1 > allFlags[flagsLen-flagsIdx].date">昔日Flag</p>
                        <p>{{ getFormatDate(allFlags[flagsLen-flagsIdx].date, '-') }}</p>
                    </div>
                    <div style="clear:both"></div>
                    <div class="time">
                        <p>制定时间:{{ allFlags[flagsLen-flagsIdx].setTime }}</p>
                        <p>检查时间:{{ allFlags[flagsLen-flagsIdx].checkTime }}</p>
                    </div>
                    <div class="flagList">
                        <ul v-if="allFlags[flagsLen-flagsIdx].dateFlag.length">
                            <li v-for="(n,index) in allFlags[flagsLen-flagsIdx].dateFlag" :key="index">
                                <div class="flagInfo">
                                    <p class="flagTitle">{{ n.flagName }}</p>
                                    <span v-if="n.isFinished"><a><img src="../../../assets/bt/true.jpg" width="20" alt=""></a></span>
                                    <span v-else><a><img src="../../../assets/bt/false.jpg" width="20" alt=""></a></span>
                                </div>
                            </li>
                            
                        </ul>
                        <div v-else>暂无数据</div>
                    </div>
                    <div class="newFlag" v-if="nowDate == allFlags[flagsLen-flagsIdx].date">
                        <a><img @click="addTodayFlagList()" src="../../../assets/bt/add.png" width="20" alt=""></a>
                    </div>
                    <div class="finish_percent">
                        <p>完成度：{{ getFinishPercentage(allFlags[flagsLen-flagsIdx].dateFlag) }}</p>
                    </div>
                </div>
            </xs-cell>
            
        </xs-scroll>
        <xs-cell pos="top">
            <div class="user">
                <div class="userimg">
                    <img :src="'./static/user/'+data.imgUrl+'.png'" width="44" style="margin-top: 6px;">
                </div>
                <div class="userinfo">
                    <p class="username">{{data.name}}</p>
                    <p class="userID">FlagID:{{data.userID}}</p>
                </div>
            </div>
        </xs-cell><!-- userCell end -->
    </div>
</template>

<script>
import xsCell from '@/components/design/cell'
import xsScroll from '@/components/design/scrollBox'

import {mapState} from 'vuex'

export default {
    name: 'flag',
    data(){
        return{
            newFlag:'',
            nowDate: this.getNowFormatDate(''),
            allFlags: Array,
            flagsLen: Number
        }
    },
    methods:{
        addTodayFlagList: function() {
            this.$router.push('/flagDtl');
        },
        changeFinish: function(flag){
            console.log('改变flag完成状态')
            if(flag.isFinished) flag.isFinished = false;
            else flag.isFinished = true;
        },
        getNowFormatDate: function(seperator1) {
            var date = new Date();
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var strDate = date.getDate();
            if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            if (strDate >= 0 && strDate <= 9) {
                strDate = "0" + strDate;
            }
            var currentdate = year + seperator1 + month + seperator1 + strDate;
            return currentdate;
        },
        getFormatDate: function(date, seperator1) {
            var year = date.substring(0,4);
            var month = date.substring(4,6);
            var strDate = date.substring(6,8);

            var currentdate = year + seperator1 + month + seperator1 + strDate;
            return currentdate;
        },
        getFinishPercentage: (dateFlag) => {
            let l = dateFlag.length;
            let count = 0;
            let percentage = '';

            for(let i=0; i<l; i++) {
                if(dateFlag[i].isFinished) count += 1
            }
            if(l === 0) percentage = '0.00%';
            else percentage = (Math.round((count/l) * 10000)/100).toFixed(2) + '%';

            return percentage;
        }
    },
    computed: {
        ...mapState({
            data: 'nowLoginUserData',
            islogin: 'islogin'
        })
    },
    mounted:function(){
        if(!this.islogin){
            this.$router.push('/login')
            this.$store.commit('btTabView', {boo: false});
        }
        this.$store.commit('btBackView', {boo: false});

        //- 储存每日flags
        this.allFlags = this.data.flags;
        this.flagsLen = this.allFlags.length;
    },
    components: { xsCell, xsScroll }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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

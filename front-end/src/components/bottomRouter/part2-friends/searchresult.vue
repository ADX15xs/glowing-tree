<template>
    <div class="search">
        <div class="contactsList">
            <xs-cell :height="80" v-for="(n,index) in searchResult" :key="index">
                <div class="friendTx">
                    <img src="http://pic.yupoo.com/abc6551776/34811dc2/c9f7e115.png" alt="" height="60">
                </div>
                <div class="friendInfo">
                    <p class="friendName">{{n.name}}</p>
                    <p class="friendFinishPrecent">今日完成度：{{(n.todayPrecent *100).toFixed(2) + '%'}}</p>
                </div>
            </xs-cell>
        </div>
        <xs-cell :height="60" pos="bottom" style="margin-bottom: 5px;"><bt-tab :activeIndex="activeIndex"></bt-tab></xs-cell>

    </div>
</template>

<script>
import xsCell from '@/components/design/cell'
import btTab from '@/components/bottomRouter/btTab'
import {mapState} from 'vuex'
export default {
    data(){
        return{
            activeIndex:1
        }
    },
    computed: mapState({        
        // data: state => state.personal_data,        
        searchResult: state => state.searchResult
    }),
    components:{
        xsCell,
        btTab
    },
    mounted:function(){
        //if(!this.$state.islogin) this.$router.push('/login')
        this.$store.commit('btBackView', {boo: true});
    }
}
</script>

<style scoped>
.contactsList{
    margin-top: 60px;
}
.friendTx{
    width: 30%;
    height: 78px;
    float: left;
    padding-top: 10px;
}
.friendTx img{
    width: 60px;
    height: 60px;
}

.friendInfo{
    width: 70%;
    height: 78px;
    float: left;
}

.friendInfo p{
    display: block;
    height: 37px;
    text-align: left;
    line-height: 37px;
}

.friendInfo p:nth-child(1){
    color: #4c2516;
    font-weight: bold;
}

</style>

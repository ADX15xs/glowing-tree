<template>
    <div class="contacts">
        <xs-scroll cut="50px">
            <div class="contactsList">
                <xs-cell :height="80" v-for="(n,index) in friendData" :key="index">
                    <div @click="toFriendDtl(n)">
                        <div class="friendTx">
                            <img :src="'./static/user/'+n.imgUrl+'.png'" height="60">
                        </div>
                        <div class="friendInfo">
                            <p class="friendName">{{n.name}}</p>
                            <p class="friendFinishPrecent">今日完成度：{{(0 *100).toFixed(2) + '%'}}</p>
                        </div>
                    </div>
                </xs-cell>
            </div>
        </xs-scroll>
        <xs-cell pos="top" :height="50">
            <input class="searchInput" type="text" placeholder="输入昵称或Flag ID" v-model="searchInput">
            <div style="width:108px; margin-right: 5px; position:absolute; right:0;">
                <img class="searchBtn" src="../../../assets/bt/search.png" height="30px" @click="search()">
                <img class="searchBtn" src="../../../assets/bt/add.png" height="30px">
            </div>
        </xs-cell>
    </div>
</template>

<script>
import xsCell from '@/components/design/cell'
import xsScroll from '@/components/design/scrollBox'

import state from 'vuex'
import {mapState} from 'vuex'

/*function indexOf(el){
    for (var i=0,n=this.length; i<n; i++){
        if (this[i] === el){
        return i;
        }
    }
    return -1;
}*/
export default {
    name: 'contacts',
    data(){
        return{
            activeIndex:1,
            friendData:'',
            searchInput:'',
            searchOne:[],
        }
    },
    components:{ xsCell, xsScroll },
    computed:{
        ...mapState({
            serverURL: 'serverURL'
        })
    },
    methods:{
        toFriendDtl: function(friendsInfo) {
            this.$store.commit('setFriendInfo', friendsInfo);
            this.$router.push('/friendDtl');
        }
        /*search:function(searchInput){
            let _self = this
            let a = _self.personal_userNameList.indexOf(_self.searchInput);
            let b = _self.personal_userIDlist.indexOf(_self.searchInput);
            // console.log(a)
            // console.log(b)
            if(a !== -1 || b !== -1){
                if(a !== -1){
                    this.$store.commit('searchResult',a)     
                    this.$router.push('/search')               
                }
                else if(b !== -1){
                    this.$store.commit('searchResult',b)   
                    this.$router.push('/search')               
                        
                }
            }
            else{
                alert('搜索不到用户')
                this.friendData = this.data
            }
        }*/
    },
    mounted:function(){
        //if(!this.$state.islogin) this.$router.push('/login')
        this.$store.commit('btBackView', {boo: false});

        this.$http({
            method: "post",
            url: "http://"+ this.serverURL +"/get_contacts",
            data: {
            }
        }).then(response => {
            //判断数据类型;
            if(response.data instanceof Array) {
                //console.log(response.data);
                this.friendData = response.data;
            }else{
                //- String 为错误提示 需弹出警告
                alert(response.data);
            }
        }).catch(error => {
            console.log(error);
        });
    }
}
</script>

<style scoped>
.searchInput{
    height: 50px;
    width: 60%;
    border: 0;
    margin-left: 20px;
    font-size: 18px;
    float: left;
    background-color: transparent;
}

.searchBtn{
    margin: 10px 10px 10px;
}
.contactsList{
    margin-top: 15px;
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

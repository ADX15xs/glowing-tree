<template>
    <div class="set">
        <xs-scroll>
            <xs-cell :height="72" v-for="(n,index) in setting" :key="index">
                <div v-if="index!=1" class="setting" @click="clickToSet(n.url, n.bHide)">{{n.label}}</div>
                <div v-else-if="index==1" class="setting" @click="changeTheme(themeStr)">{{themeStr}}</div>
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
    name: 'set',
    data(){
        return{
            setting: [
                {id: 1, label: '个人资料设置', url: '/userInfo', bHide:false},
                {id: 2, label: '', url: '', bHide:false},
                {id: 3, label: '关于', url: '/about', bHide:true},
                {id: 4, label: '支持我们', url: '/donateUs', bHide:true}
            ],
        }
    },
    components:{ xsCell, xsScroll },
    methods: {
        clickToSet: function(url, bHideBtTab) {
            //console.log(url);
            if(bHideBtTab) this.$store.commit('btTabView', {boo: !bHideBtTab});

            this.$router.push(url);
        },
        changeTheme: function(val) {
            if(val == '夜间模式'){
                $('#style').attr('href', 'static/themeCSS/styleNight.css');
                this.$store.commit('setThemeStr', '日间模式');
            }
            else if(val == '日间模式') {
                $('#style').attr('href', 'static/themeCSS/styleDay.css');
                this.$store.commit('setThemeStr', '夜间模式');
            }
        }
    },
    mounted:function(){
        //if(!this.$state.islogin) this.$router.push('/login')
        this.$store.commit('btBackView', {boo: false});
    },
    computed:{
        ...mapState({
            themeStr: 'themeStr'
        })
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.setting{
    text-align: center;
    color: #545454;
    line-height: 70px;
    font-weight: bold;
    font-size: 20px;
}
</style>

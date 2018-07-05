<template>
    <div>
        <xs-scroll>
            <xs-cell :height="72" v-for="(n,index) in ach" :key="index">
                <div class="setting" @click="clickToList(n.url)">{{n.label}}</div>
            </xs-cell>
        </xs-scroll>
    </div>
</template>

<script>
import xsCell from '@/components/design/cell'
import xsScroll from '@/components/design/scrollBox'


export default {
    name: 'achievement',
    data(){
        return{
            ach: [
                {id: 1, label: '日榜', url: '/dayList'},
                {id: 2, label: '周榜', url: '/weekList'},
                {id: 3, label: '月榜', url: '/monthList'}
            ]
        }
    },
    components: { xsCell, xsScroll },
    methods: {
        clickToList: function(url) {
            //console.log(url);
            this.$router.push(url);
        }
    },
    mounted:function(){
        //if(!this.$state.islogin) this.$router.push('/login')
        this.$store.commit('btBackView', {boo: false});
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.setting{
    text-align: center;
    color: #545454;
    height: 70px;
    line-height: 70px;
    font-weight: bold;
    font-size: 20px;
}
</style>

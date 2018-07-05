<template>
    <div class="overview">
        <xs-scroll>
            <xs-cell :height="200">
                <img src="../../../assets/bt/week.png" alt="">
            </xs-cell>
            <xs-cell :height="200">
                <img src="../../../assets/bt/month.png" alt="">
            </xs-cell>
        </xs-scroll>
    </div>
</template>

<script>
import xsCell from '@/components/design/cell'
import xsScroll from '@/components/design/scrollBox'


export default {
    name: 'overview',
    data(){
        return{
            activeIndex:2
        }
    },
    components:{ xsCell, xsScroll},
    mounted:function(){
        //if(!this.$state.islogin) this.$router.push('/login')
        this.$store.commit('btBackView', {boo: false});
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.overview xs-cell {
    text-align: center;
}
.overview img{
    height: 160px;
    border: 1px solid #eee;
    margin: 18px 0;
}
</style>

<template>
    <div class="personal">
        <xs-scroll>
            这里是隐私设置
        </xs-scroll>
    </div>
</template>

<script>
import xsCell from '@/components/design/cell'
import xsScroll from '@/components/design/scrollBox'

export default {
    name: 'personal',
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
    }
}
</script>

<style scoped>
.widthBG {
    position: fixed;
    top:0;
    left: 0;

    background-color: white;
    width: 100vw;
    height: 100vh;
}
.widthBG img {
    width: 320px;
    margin: 30vh auto 0;
}
.copyRight{
    min-width: 50%;

    position: absolute;
    left: 25%;
    bottom: 100px;

    color: #666;
    font-size: 10px;
    line-height: 16px
}
</style>

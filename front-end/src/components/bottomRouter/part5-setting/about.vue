<template>
    <div class="about">
        <div class="widthBG" @click="goToSet()">
            <img src="../../../assets/set/about.jpg" />
            <div class="copyRight">
                <p>天坑小队出品</p>
                <p>Copyright@2017-2018 Sinkhole</p>
                <p>All Right Reserved</p>
            </div>
        </div>
    </div>
</template>

<script>
import xsCell from '@/components/design/cell'

export default {
    name: 'about',
    data(){
        return{

        }
    },
    components:{  xsCell },
    methods: {
        goToSet:function() {
            this.$router.go(-1);
            this.$store.commit('btTabView', {boo: true});
        }
    },
    mounted:function(){
        //if(!this.$state.islogin) this.$router.push('/login')
        this.$store.commit('btBackView', {boo: false});
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

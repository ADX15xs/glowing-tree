<template>
    <div class="donateUs">
        <div class="widthBG" @click="goToSet()">
            <img src="../../../assets/set/starSky.jpg" id="skyBg" />
            <img src="../../../assets/set/code.jpg" id="code" />
        </div>
    </div>
</template>

<script>
import xsCell from '@/components/design/cell'

export default {
    name: 'donateUs',
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
.widthBG #skyBg {
    width: 100%;
    height: calc(100% - 40px);
    margin-top: 40px;
}
.widthBG #code {
    width: 200px;
    height: 200px;
    position: absolute;
    top: calc((100vh - 200px) / 2);
    left: calc((100vw - 200px) / 2);
}

</style>

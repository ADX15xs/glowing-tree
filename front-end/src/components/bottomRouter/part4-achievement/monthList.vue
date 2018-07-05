<template>
  <div class="monthList">
      <xs-scroll>
        <xs-cell :height="72">一个月榜！</xs-cell>
      </xs-scroll>
  </div>
</template>

<script>
import xsCell from '@/components/design/cell'
import xsScroll from '@/components/design/scrollBox'

export default {
    name: 'monthList',
    data(){
        return{

        }
    },
    components:{  xsCell, xsScroll },
    mounted:function(){
        //if(!this.$state.islogin) this.$router.push('/login')
        this.$store.commit('btBackView', {boo: true});
    }
}
</script>

<style scoped>

</style>
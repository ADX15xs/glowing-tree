<template>
    <div class="headLine">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'headLine',
    data(){
        return{

        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.headLine {
    width: 100%;
    height: 40px;
    position: fixed;
    top: 0;
    background-color: #642e19;
}

.headLine a{
  position: fixed;
  right: 10px;
  top: 8px;
  text-decoration: none;
  color: #fff;

}
</style>

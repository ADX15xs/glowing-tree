<template>
    <div class="btTab">
        <ul>
            <li
                v-for="(item, index) in bottoms" :key="index"
                v-on:click="makeActive(item, index)"
                class="tabButton"
            >
                <img
                    :src='"../../assets/bt/" + item.id + ((item.active)?"_act":"") + ".png"'
                    height="24"
                >
                <div
                    v-bind:class="{ show:item.active }"
                    class="smallsize-font"
                >
                    {{ item.label }}
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'btTab',
    data() {
        return {
            bottoms: [
                {id: 1, label: 'Flag', active: true},
                {id: 2, label: '朋友们', active: false},
                {id: 3, label: '概览', active: false},
                {id: 4, label: '成就', active: false},
                {id: 5, label: '设置', active: false}
            ]
        }
    },
    methods: {
        makeActive: function(item, index){
            this.active = item.label;
            for(var i=0; i<this.bottoms.length;i++){
                this.bottoms[i].active = false;
                this.bottoms[i].bottoms = false;
            }
            this.bottoms[index].active = true;

            switch(index){
                case 0:
                    this.$router.push('/');
                    break;
                case 1:
                    this.$router.push('/cnt');
                    break;
                case 2:
                    this.$router.push('/ovv');
                    break;
                case 3:
                    this.$router.push('/ach');
                    break;
                case 4:
                    this.$router.push('/set');
                    break;
            }
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
*{
    margin: 0;
    padding: 0;
}

.tabButton {
    float: left;
    list-style: none;
    width: 24px;
    margin: calc((60px - 42px) / 2) calc((20% - 24px) / 2);
    text-align: center;
}
.smallsize-font {
    font-size:12px;
    font-weight: bold;
    width: 36px;
    
    -webkit-transform-origin-x: 0;
    -webkit-transform: scale(calc(2 / 3));
}

.show{
    color:#642e19;
}
</style>

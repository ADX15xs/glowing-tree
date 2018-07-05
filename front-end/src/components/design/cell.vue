<template>
    <div class="xs214-cell" :style="{
        'min-height': cellHeight,
        'position': cellPos,
        'top': cellTop,
        'bottom': cellBottom
        }">
        <slot></slot>
    </div>
</template>

<script>

/**
 * xs-cell
 * @module components/design/cell
 * @desc 承载框
 * @param {number} height - 尺寸
 * @param {string} position - 位置
 * @param {slot} - 填充内容
 *
 * @example
 * <xs-cell :height="90" color="#fff" pos="top"></xs-cell>
 * <xs-cell :height="90" color="#fff">
 *   <div>描述文字啊哈</div>
 * </xs-cell>
 */

export default {
    name: 'xs-cell',
    computed: {
        cellHeight() {
            return (this.flaglist*30+150  || this.height) + 'px';
        },
        cellPos() {
            if(this.pos) return 'fixed';
            else return false;
        },
        cellTop() {
           if(this.pos == 'top') return 40 + 'px';
           else return false;
        },
        cellBottom() {
            if(this.pos == 'bottom') return 0;
            else return false;
        }
    },
    props: {
        height: Number,
        pos: String,
        flaglist:Number,
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.xs214-cell {
    width: calc(100vw - 11px);

    background-color: #fff;
    
    border-radius: 8px;
    margin: 5px 5px 10px;
    box-shadow: 0px 3px 5px #aaa;
}

</style>
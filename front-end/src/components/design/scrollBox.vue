<template>
    <div class="xs214-scrollBox" :style="{
        'background-color': scrollColor,
        'bottom': scrollBottom
        }">
        <div id="parent" :style="{'height': scrollHeight}">
            <div id="child">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>

/**
 * xs-cell
 * @module components/design/scrollBox
 * @desc 承载滚动内容框
 * @param {number} cut - 减去所需高度
 * @param {string} bottom - 与浏览器框底部的距离
 * @param {string} color - 颜色
 * @param {slot} - 填充内容
 *
 * @example
 * <xs-scroll cut="20px" color="transparent" :bottom="70"></xs-scroll>
 * <xs-scroll cut="20px" color="transparent">
 *   <div>描述文字啊哈</div>
 * </xs-scroll>
 */

export default {
    name: 'xs-scrollBox',
    computed: {
        scrollColor() {
            return this.color || 'transparent';
        },
        scrollHeight() {
            return this.cut?'calc(100vh - 110px - '+ this.cut +')':'calc(100vh - 110px)';
        },
        scrollBottom() {
            return ( this.bottom || 70 ) + 'px';
        }
    },
    props: {
        cut: String,
        color: String,
        bottom: String,
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.xs214-scrollBox {
    position: fixed;
}

#parent {
    overflow: hidden;
    width: 100vw;
}
#child {
    overflow-y: auto;
    overflow-x: hidden;
    height: 100%;
    width: calc(100vw + 15px);
}

</style>
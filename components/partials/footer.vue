<template>
    <div>
        <nav class="mui-bar mui-bar-tab">
            <router-link class="mui-tab-item mui-active" to="/home">
                <span class="mui-icon mui-icon-home"></span>
                <span class="mui-tab-label">首页</span>
            </router-link>
            <a class="mui-tab-item" href="#tabbar-with-chat">
                <span class="mui-icon mui-icon-member"></span>
                <span class="mui-tab-label">会员</span>
            </a>
            <router-link class="mui-tab-item" to="/goods/shopCart">
                <span class="mui-icon mui-icon-shopcart"><span class="mui-badge">{{cartNum}}</span></span>
                <span class="mui-tab-label">购物车</span>
            </router-link>
            <a class="mui-tab-item" href="#tabbar-with-map">
                <span class="mui-icon mui-icon-search"></span>
                <span class="mui-tab-label">查找</span>
            </a>
        </nav>
    </div>
</template>
<script>
import GoodsTools from '../goods/goodsTools.js';
export default {
    data() {
        return {
            cartNum: 1
        }
    }, created() {
        this.cartNum = GoodsTools.getTotalCount();
        this.Connect.$on('addCart', (num) => {
            this.cartNum += num;
        });
    }
}
</script>
<style>
</style>

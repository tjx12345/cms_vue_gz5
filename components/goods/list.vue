<template>
    <div class="tmpl" style="height:100%">
        <go-back-header title="商品列表"></go-back-header>
        <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="hasProduct" :auto-fill="autoFill">
            <ul class="mui-table-view mui-grid-view">
                <li class="mui-table-view-cell mui-media mui-col-xs-6" v-for="item in products" :key="item.id">
                    <router-link :to="{name:'goods.detail',query:{id:item.id} }">
                        <img class="mui-media-object" :src="item.img_url">
                        <div class="mui-media-body">{{item.title}}</div>
                        <div class="desc">
                            <div class="sell">
                                <span>￥{{item.sell_price}}</span>
                                <s>￥{{item.market_price}}</s>
                            </div>
                            <div class="detail">
                                <div class="hot">
                                    热卖中
                                </div>
                                <div class="count">
                                    剩{{item.stock_quantity}}件
                                </div>
                            </div>
                        </div>
                    </router-link>
                </li>
            </ul>
        </mt-loadmore>
    </div>
</template>
<script>
export default {
    data() {
        return {
            products: [],
            autoFill: false,
            pageindex: 1,
            hasProduct: false,
        }
    }, created() {
        let url = '/api/getgoods?pageindex=' + this.pageindex;
        //发起请求获取数据
        this.$http.get(`${this.config.apiPath}${url}`)
            .then(res => {
                //将数据放到页面中
                this.pageindex++;
                this.products = res.body.message;

            }, res => {
                console.log('获取商品信息失败');
            });

    }, methods: { //组件创建以后，index就变成了第2页，以后你拉就拉第二页以后的部分
        //如果你拉错了,index不加，还是再从第二页拉
        loadBottom(id) {
            // 加载更多数据
            this.$http.get(`${this.config.apiPath}/api/getgoods?pageindex=${this.pageindex}`)
                .then(res => {
                    //如果当前没有商品，禁止下拉的行为
                    if (res.body.message.length === 0) this.hasProduct = true;
                    //第二次或者以后的请求是成功的
                    this.pageindex++;
                    //追加数据
                    this.products = this.products.concat(res.body.message);
                }, res => {
                    console.log('拉取数据失败');
                });
        },
        // handleBottomChange(status) {
        //     console.log('handleBottomChange');
        //     this.bottomStatus = status;
        // }
    }
}
</script>
<style scoped>
.mui-table-view.mui-grid-view .mui-table-view-cell > a:not(.mui-btn) {
    margin: 0px;
    padding: 0px;
    border: 1px solid #5c5c5c;
    box-shadow: 0 0 4px #666;
}

.sell > span {
    float: left;
    color: red;
    text-align: left;
}

.detail >.hot {
    float: left;
    text-align: left;
    font-size: 15px;
}

.detail >.count {
    float: right;
    text-align: right;
    font-size: 15px;
}


/*撑开，去除浮动没有的高度*/

.detail {
    overflow: hidden;
}

.desc {
    color: rgba(92, 92, 92, 0.8);
    background-color: rgba(0, 0, 0, 0.2);
}

.mui-table-view.mui-grid-view .mui-table-view-cell .mui-media-object {
    height: 200px;
}
</style>

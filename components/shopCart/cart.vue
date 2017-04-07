<template>
    <div>
        <div class="pay-detail">
            <ul>
                <li class="p-list" v-for="(item,index) in prods" :key="item.id">
                    <mt-switch v-model="item.isSelected"></mt-switch>
                    <img :src="item.thumb_path">
                    <div class="pay-calc">
                        <p>商品标题</p>
                        <div class="calc">
                            <span>￥{{item.sell_price}}</span>
                            <span @click="substract(index)">-</span>
                            <span>{{item.pickNum}}</span>
                            <span @click="add(index)">+</span>
                            <a href="javascript:;" @click="del(index)">删除</a>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="show-price">
            <div class="show-1">
                <p>总计(不含运费):</p>
                <span>已经选择商品{{payment.pickCount}}件，总价￥{{payment.pickPrice}}元</span>
            </div>
            <div class="show-2">
                <mt-button type="danger" size="large">去结算</mt-button>
            </div>
        </div>
    </div>
</template>
<script>
import GoodsTools from '../goods/goodsTools.js';
import Connect from '../commons/connect.js';
export default {
    data() {
        return {
            prods: []
        }
    }, created() {
        let shopCart = GoodsTools.get();
        let url = this.config.apiPath + '/api/goods/getshopcarlist/';
        for (var i = shopCart.length - 1; i >= 0; i--) {
            if (i == 0) {
                url += shopCart[i].id;
            } else {
                url += shopCart[i].id + ',';
            }
        }
        this.$http.get(url)
            .then(res => {
                let tmp = res.body.message;
                for (var i = tmp.length - 1; i >= 0; i--) {
                    for (var j = shopCart.length - 1; j >= 0; j--) {
                        if (shopCart[j].id == tmp[i].id) {
                            tmp[i].isSelected = true;
                            tmp[i].pickNum = shopCart[j].num;
                        }
                    }
                }
                this.prods = tmp;
            }, res => {

            })

    }, computed: {
        payment() {
            let pickCount = 0;
            let pickPrice = 0;

            console.log(this.prods);
            for (var i = this.prods.length - 1; i >= 0; i--) {
                if (this.prods[i].isSelected) {
                    pickCount++;
                    pickPrice += this.prods[i].sell_price * this.prods[i].pickNum;
                }
            }
            return {
                pickPrice,
                pickCount
            }
        }
    }, methods: {
        add(index) {
            this.prods[index].pickNum++;
        },
        substract(index) {
            this.prods[index].pickNum--;
        },
        del(index) {
            if (window.confirm('确定要删除吗')) {
                Connect.$emit('addCart', 0 - this.prods[index].pickNum);
                this.prods.splice(index, 1);
                GoodsTools.delCart(index);
            }


        }
    }
}
</script>
<style scoped>
.pay-detail ul li {
    list-style: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    margin-bottom: 3px;
}

.pay-detail ul {
    padding-left: 5px;
    margin-top: 5px;
}

.pay-detail ul li img {
    width: 80px;
    height: 80px;
    display: inline-block;
    vertical-align: top;
    margin-top: 10px;
}

.pay-detail ul li >:nth-child(1),
.pay-detail ul li >:nth-child(3) {
    display: inline-block;
}

.pay-calc p {
    display: inline-block;
    width: 250px;
    overflow: hidden;
    color: blue;
    font-size: 15px;
    margin-bottom: 10px;
}

.pay-detail ul li >:nth-child(1) {
    line-height: 80px;
}

.calc:nth-child(1) {
    color: red;
    font-size: 20px;
}

.calc span:not(:nth-child(1)) {
    border: 1px solid rgba(0, 0, 0, 0.3);
    display: inline-block;
    width: 20px;
    text-align: center;
}

.calc a {
    margin-left: 20px;
}

.show-1,
.show-2 {
    display: inline-block;
}

.show-1,
.show-2 {
    margin-left: 30px;
}

.show-price {
    background-color: rgba(0, 0, 0, 0.2);
}
</style>

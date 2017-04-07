<template>
    <div class="tmpl">
        <!-- 引入返回导航 -->
        <go-back-header title='图片分享'></go-back-header>
        <div class="photo-header">
            <ul>
                <li v-for="item in categorys" :key="item.id">
                    <a href="javascript:;" @click="getImgs(item.id)">{{item.title}}</a>
                </li>
            </ul>
        </div>
        <div class="photo-list">
            <ul>
                <!-- 加入图片懒加载 把:src="item.img_url"改成v-lazy="item"-->
                <!-- 另外加上css部分 -->
                <li v-for="item in imgs">
                    <router-link :to="'/photo/detail/'+item.id">
                        <img v-lazy="item.img_url">
                        <p>
                            <span>{{item.title}}</span>
                            <br>
                            <span>{{item.zhaiyao}}</span>
                        </p>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            categorys: [],
            imgs: [],
        }
    }, created() {
        //发起请求获取分类
        this.$http.get(this.config.apiPath + '/api/getimgcategory')
            .then(res => { //res.body.message 是一个数组

                this.categorys = res.body.message;
                this.categorys.unshift({ //由于默认请求没有获取到全部，所以我们自己添加一个
                    id: 0,
                    title: '全部'
                });
            }, res => {
                console.log('图片分享出异常了');
            });
        //加载图片信息
        this.getImgs(0); //老师曾今报错，没给this,haha
    }, methods: {
        getImgs(id) {
            this.$http.get(this.config.apiPath + '/api/getimages/' + id)
                .then(res => {
                    this.imgs = res.body.message;
                }, res => {

                })
        }
    }
}
</script>
<style>
.photo-header li {
    list-style: none;
    display: inline-block;
    margin-left: 10px;
    height: 30px;
}

.photo-header ul {
    /*强制不换行*/
    white-space: nowrap;
    overflow-x: auto;
    padding-left: 0px;
    margin: 5;
}


/*下面的图片*/

.photo-list li {
    list-style: none;
    position: relative;
}

.photo-list li img {
    width: 100%;
    height: 230px;
    vertical-align: top;
}

.photo-list ul {
    padding-left: 0px;
    margin: 0;
}

.photo-list p {
    position: absolute;
    bottom: 0px;
    color: white;
    background-color: rgba(0, 0, 0, 0.3);
    margin-bottom: 0px;
}

.photo-list p span:nth-child(1) {
    font-weight: bold;
    font-size: 16px;
}


/*mint-ui懒加载*/

image[lazy=loading] {
    width: 40px;
    height: 300px;
    margin: auto;
}
</style>

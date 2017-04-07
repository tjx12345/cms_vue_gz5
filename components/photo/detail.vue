<template>
    <div class="tmpl">
        <go-back-header title="图文详情"></go-back-header>
        <div class="photo-title">
            <p>{{info.title}}</p>
            <span>发起日期：{{info.add_time | convertTime}}</span>
            <span>{{info.click}}次浏览</span>
            <span>分类：民生经济</span>
        </div>
        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3" v-for="(item,index) in imgs" :key="index">
                <img class="preview-img" :src="item.src" height="100" @click="$preview.open(index, imgs)">
            </li>
        </ul>
        <div class="photo-desc">
            <p v-html="info.content"></p>
        </div>
        <comment :commentId="pid"></comment>
    </div>
</template>
<script>
export default {
    data() {
        return {
            //声明这个info
            info: {},
            imgs: [],
            pid: '',
        }
    }, created() {
        //1:获取参数id
        let id = this.$route.params.id; //获取图片详情的id
        this.pid = id; //拿着图片详情的id去查找对应的评论
        //2:将id作为参数发起请求
        this.getInfo(id);
        //  2.2：获取缩略图
        this.getImgs(id);

    }, methods: {
        getInfo(id) {
            this.$http.get(`${this.config.apiPath}/api/getnew/${id}`)
                .then(res => {
                    //  2.1:获取图文详情
                    this.info = res.body.message[0]; //返回的是一个数组
                }, res => {
                    console.log('出异常了');
                });
        },
        getImgs(id) {
            this.$http.get(`${this.config.apiPath}/api/getthumimages/${id}`)
                .then(res => {
                    this.imgs = res.body.message; //数组，我们全要
                    //此时的css几乎没有没效果，我们需要给每一个元素指定w，h高
                    //让其x属性就有值，不会报错
                    this.imgs.forEach(function(img) {
                        img.h = 300;
                        img.w = 300;
                    });

                    //3:将各种数据响应到页面 
                }, res => {
                    console.log('出异常了');
                });
        }
    }
}


/**
 * 在webpack.config.js文件中加入该部分
 * {
                test: /vue-preview.src.*?js$/,
                loader: 'babel-loader',
                options: {
                    presets: ['es2015'],
                    plugins: ['transform-runtime']
                }
 */
</script>
<style scoped>
li {
    list-style: none;
}

ul {
    margin: 0;
    padding: 0;
}

.photo-title {
    overflow: hidden;
}

.photo-title,
.photo-desc {
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    padding-bottom: 5px;
    margin-bottom: 5px;
    padding-left: 5px;
}

.photo-title p {
    color: #13c2f7;
    font-size: 20px;
    font-weight: bold;
}

.photo-title span {
    margin-right: 20px;
}

.mui-table-view.mui-grid-view.mui-grid-9 {
    background-color: white;
    border: 0;
}

.mui-table-view.mui-grid-view.mui-grid-9 li {
    border: 0;
}

.photo-desc p {
    font-size: 18px;
}

.mui-table-view-cell.mui-media.mui-col-xs-4.mui-col-sm-3 {
    padding: 2 2;
}


/*.mui-table-view-cell.mui-media.mui-col-xs-4.mui-col-sm-3 img {
    height: 80px;
    width: 80px;
}*/
</style>

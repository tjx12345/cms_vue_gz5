<template>
    <div>
        <div>
            <my-swipe :imgs="imgs"></my-swipe>
        </div>
        <div>
            <div class="mui-content">
                <ul class="mui-table-view mui-grid-view mui-grid-9">
                    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                        <router-link to="/news/newsList">
                            <span class="mui-icon mui-icon-home"></span>
                            <div class="mui-media-body">新闻资讯</div>
                        </router-link>
                    </li>
                    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                        <router-link to="/photo/share">
                            <span class="mui-icon mui-icon-email"></span>
                            <div class="mui-media-body">图片分享</div>
                        </router-link>
                    </li>
                    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                        <router-link to='/goods/goodsList'>
                            <span class="mui-icon mui-icon-chatbubble"></span>
                            <div class="mui-media-body">商品展示</div>
                        </router-link>
                    </li>
                    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                        <a href="#">
                            <span class="mui-icon mui-icon-location"></span>
                            <div class="mui-media-body">留言反馈</div>
                        </a>
                    </li>
                    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                        <a href="#">
                            <span class="mui-icon mui-icon-search"></span>
                            <div class="mui-media-body">搜索资讯</div>
                        </a>
                    </li>
                    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                        <a href="#">
                            <span class="mui-icon mui-icon-phone"></span>
                            <div class="mui-media-body">联系我们</div>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            imgs: []
        }
    }, created() {
        this.$http.get(this.config.apiPath + '/api/getlunbo')
            .then(res => {
                // console.log(res.body);
                this.imgs = res.body.message;
            }, res => {
                console.log('获取图片资源失败');
            })
    }
}
</script>
<style scoped>
.mui-table-view.mui-grid-view.mui-grid-9 {
    margin-top: 0px;
}

.mui-icon-home:before,
.mui-icon-email:before,
.mui-icon-chatbubble:before,
.mui-icon-location:before,
.mui-icon-phone:before,
.mui-icon-search:before {
    content: '';
    display: inline-block;
    height: 50px;
    width: 50px;
}

.mui-icon-home:before {
    background: url('../../static/images/news.png');
    background-repeat: round;
}

.mui-icon-email:before {
    background: url('../../static/images/picShare.png');
    background-repeat: round;
}

.mui-icon-chatbubble:before {
    background: url('../../static/images/goodShow.png');
    background-repeat: round;
}

.mui-icon-location:before {
    background: url('../../static/images/feedback.png');
    background-repeat: round;
}

.mui-icon-phone:before {
    background: url('../../static/images/search.png');
    background-repeat: round;
}

.mui-icon-search:before {
    background: url('../../static/images/callme.png');
    background-repeat: round;
}

.mui-table-view.mui-grid-view.mui-grid-9 {
    background-color: white;
}

.mui-table-view.mui-grid-view.mui-grid-9 li {
    border: 0;
}
</style>

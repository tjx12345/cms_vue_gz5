<template>
    <div class="tmpl">
        <div class="photo-bottom">
            <ul>
                <li class="photo-comment">
                    <div>
                        <span>提交评论</span>
                        <span><a >返回</a></span>
                    </div>
                </li>
                <li class="txt-comment">
                    <textarea v-model="newcomment"></textarea>
                </li>
                <li>
                    <mt-button type="primary" size="large" @click="sendMsg">发表评论</mt-button>
                </li>
                <li class="photo-comment">
                    <div>
                        <span>评论列表</span>
                        <span>44条评论</span>
                    </div>
                </li>
            </ul>
            <ul class="comment-list">
                <li v-for="(item,index) in comments" :key="index">
                    {{item.user_name}}:{{item.content}} {{item.add_time |convertTime}}
                </li>
            </ul>
            <mt-button type="danger" size="large" plain @click="loadMore">加载更多</mt-button>
        </div>
    </div>
</template>
<script>
import {
    Indicator
} from 'mint-ui';
export default {
    data() {
            return {
                pageindex: 1,
                comments: [],
                newcomment: ''
            }
        }, props: ['commentId'] // 名称自己定义,只要父级组件用我，就必须传递该值
        , created() {
            //获取父组件传递的commentId
            this.loadMore(); //this.pageindex在这个时候永远是1
        }, methods: {
            //加载更多
            loadMore() { //  1  2
                this.$http.get(`${this.config.apiPath}/api/getcomments/${this.$props.commentId}?pageindex=${this.pageindex}`)
                    .then(res => {
                        //请求成功以后将id + 1
                        this.pageindex++;
                        this.comments = this.comments.concat(res.body.message);
                    }, res => {
                        console.log('获取评论失败');
                    })
            },
            sendMsg() {
                //数据是this.newcomment
                Indicator.open('拼命发送中...');
                //发送请求
                this.$http.post(`${this.config.apiPath}/api/postcomment/${this.$props.commentId}`, {
                        content: this.newcomment
                    }, {
                        emulateJSON: true
                    })
                    .then(res => {
                        Indicator.close(); //关闭图标显示


                        //将当前的评论数据追加到总体评论数据的最上方
                        // this.comments.unshift(
                        //     this.newcomment
                        // });
                        //获取当前第一页的数据，重置this.pageindex 为初始值1显示第一页数据
                        this.pageindex = 1;
                        //清空原来的数据信息数组
                        this.comments = [];
                        this.newcomment = ''; //清空文本框
                        this.loadMore();

                    }, res => {
                        console.log('发表评论失败');
                    })
            }
        }
}
</script>
<style scoped>
.photo-comment > div span:nth-child(1) {
    float: left;
    font-weight: bold;
    margin-left: 5px;
}

.photo-comment > div span:nth-child(2) {
    float: right;
}

.photo-comment {
    height: 30px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.4);
    line-height: 30px;
    margin-bottom: 5px;
}

.txt-comment {
    padding: 5 5;
}

.txt-comment textarea {
    margin-bottom: 5px;
}

.comment-list li {
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    padding-bottom: 5px;
    margin-bottom: 5px;
    padding-left: 5px;
}

li {
    list-style: none;
}

ul {
    margin: 0;
    padding: 0;
}
</style>

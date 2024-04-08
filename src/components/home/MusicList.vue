<template>
    <div>
        <div class="musiclist">
            <div class="musictop">
                <div class="title">发现好歌单</div>
                <div class="more">查看更多</div>
            </div>
            <div class="musicContent">
                <van-swipe :loop="false" :width="150" class="my-swiper" :show-indicators="false" >
                    <van-swipe-item v-for="item in state.musiclist" :key="item.id" @click="ToitemMusic(item.id)">
                            <img :src="item.picUrl" alt="">
                            <div class="playContent">
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-24gl-play"></use>
                                </svg>
                                {{ changContent(item.playCount) }}
                            </div>

                        <span class="name">{{ item.name }}</span>
                    </van-swipe-item>
                </van-swipe>

            </div>
        </div>
    </div>
</template>

<script>
import { Getgendan } from '@/requerst/api/home'
import { reactive, onMounted } from 'vue'
import { useRoute,useRouter } from 'vue-router'
export default {
    setup() {
        const state = reactive({
            musiclist: []
        })
        const router = new useRouter()
        function changContent(num) {
            if (num > 100000000) {
                return (num / 100000000).toFixed(1) + '亿'
            } else if (num > 10000) {
                return (num / 100000000).toFixed(1) + '万'
            }
        }
        
        //跳转歌单详情页面
        function ToitemMusic(id){
            router.push(
                {
                    path:'ItemMusic',
                    query:{
                        itemmusicid:id
                    }
                }
            )
            console.log("12")
        }
        
        onMounted(() => {
            //获取推荐歌单
            Getgendan()
                .then((respon) => {
                    state.musiclist = respon.data.result
                    console.log('请求成功', respon)
                })
                .catch((error) => {
                    console.log('请求失败', error)
                })
        })
        return { state, changContent,ToitemMusic }
    }
}
</script>

<style lang="less" scoped>
.musiclist {
    .musictop {
        width: 100%;
        height: 0.6rem;
        display: flex;
        justify-content: space-between;
        margin-bottom: .2rem;

        .title {
            font-size: .4rem;
            font-weight: 900;
        }

        .more {
            border: 1px solid #ccc;
            text-align: center;
            line-height: 0.6rem;
            padding: 0 0.2rem;
            border-radius: 0.4rem;
        }
    }

    .musicContent {
        height: 100%;

        .my-swiper {
            width: 100%;
            .van-swipe-item {
                margin: 0 .2rem;
                position: relative;
                img {
                    height: 100%;
                    width: 100%;
                    border-radius: .3rem;
                }

                .playContent {
                    display: flex;
                    align-items: center;
                    position: absolute;
                    top: .1rem;
                    right: 0;
                    font-weight: 550;
                    color: #fff;
                    .icon{
                        color: #fff;
                    }
                }
            }


        }
    }
}
</style>
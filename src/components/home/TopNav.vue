<template>
    <div class="TopNavVUE">

        <div class="topNav">

            <div class="topleft">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-31liebiao"></use>
                </svg>
            </div>

            <div class="topContent">
                <span @click="goinfoUser">我的</span>
                <span class="active">发现</span>
                <span>云村</span>
                <span>视频</span>
            </div>

            <div class="topright">
                <svg class="icon" aria-hidden="true" @click="tosearch">
                    <use xlink:href="#icon-sousuo"></use>
                </svg>
            </div>

        </div>
    </div>
</template>

<script>
import { useRoute, useRouter } from 'vue-router'
export default {
    name: 'TopNav',
    setup(props) {
        const router = new useRouter()
        //跳转到搜索页面
        function tosearch(){
            router.push(
                {
                    path:'/Search'
                }
            )
        }
        //跳转至个人中心页面
        function goinfoUser(){
            router.push(
                {
                    path:'/InfoUser'
                }
            )
        }
        return{tosearch,goinfoUser}
    }
}
</script>

<style lang="less" scoped>
.topNav {
    width: 95%;
    height: 1rem;
    padding: 0.2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .topContent {
        width: 65%;
        height: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        font-size: .36rem;

        .active {
            font-weight: 900;
        }
    }
}
</style>
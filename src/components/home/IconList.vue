<template>
    <div>
        <div class="iconlist">
            <div class="iconitem" v-for="(item, index) in state.iconlist" :key="index">
                <svg class="icon" aria-hidden="true">
                    <use :xlink:href="item.icon"></use>
                </svg>
                <span>{{ item.text }}</span>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, onMounted } from 'vue'
import { Getgendan } from '@/requerst/api/home'
export default {

    setup() {
        // 渲染数据
        const state = reactive({
            iconlist: [
                {
                    id: 1,
                    icon: '#icon-tuijian',
                    text: '每日推荐'
                },
                {
                    id: 2,
                    icon: '#icon-zhibo',
                    text: '私人FM'
                },
                {
                    id: 3,
                    icon: '#icon-gedan',
                    text: '排行榜'
                },
            ]
        })
       
        return { state }
    }
}
</script>

<style lang="less" scoped>
.iconlist {
    width: 100%;
    height: 2rem;
    margin-top: .2rem;
    display: flex;
    justify-content: space-around;
    align-items: center;

    .iconitem {
        width: 25%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;

        .icon {
            height: 1rem;
            width: 1rem;
        }
    }
}
</style>
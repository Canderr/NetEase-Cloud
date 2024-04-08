<template>
    <div>
        <ItemMusicTop :playlist="state.playlist"></ItemMusicTop>
        <ItemMusicList :itemList="state.itemList" :playlist="state.playlist"></ItemMusicList>
    </div>
</template>

<script>
import { useRoute, useRouter } from 'vue-router'
import { onMounted, reactive } from 'vue';
import { Getitemmuscidetail, Getitemmusiclist } from '@/requerst/api/musicitem'
import ItemMusicTop from '@/components/ItemMusic/ItemMusicTop.vue';
import ItemMusicList from '@/components/ItemMusic/ItemMusicList.vue';
export default {
    setup() {
        const route = new useRoute()
        const state = reactive({
            playlist: {},//歌单详情
            itemList:[]//歌单所有歌曲
        })
        onMounted(() => {
            //接受路由跳转穿过来的歌单id
            const itemmusicid = route.query.itemmusicid
            //获取歌单详情
            Getitemmuscidetail(itemmusicid)
                .then((respon) => {
                    state.playlist = respon.data.playlist
                    console.log('请求成功', respon)
                })
                .catch((error) => {
                    console.log("请求失败", error)
                })

            //获取歌单歌曲
            Getitemmusiclist(itemmusicid)
                .then((respon) => {
                    state.itemList = respon.data.songs
                    console.log('歌单歌曲', respon)
                })
                .catch((error) => {
                    console.log('请求失败', error.message)
                })

            //防止页面刷新，数据丢失，将数据保存到sessionStorage中
            sessionStorage.setItem('itemDetail', JSON.stringify(state))
        })
        return { state }
    },
    components: {
        ItemMusicTop,
        ItemMusicList
    }
}
</script>

<style></style>
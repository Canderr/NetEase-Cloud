<template>
    <div class="Homevue">
        <div class="header">
            <TopNav></TopNav>
        </div>
        <div class="swiper">
            <SwiperTop></SwiperTop>
        </div>
        <div class="iconlist">
            <IconList></IconList>
        </div>
        <div class="musiclist">
            <MusicList></MusicList>
        </div>
    </div>
</template>

<script>
import TopNav from '@/components/home/TopNav.vue';
import SwiperTop from '@/components/home/SwiperTop.vue'
import IconList from '@/components/home/IconList.vue';
import MusicList from '@/components/home/MusicList.vue';
export default {
    name: "Home",
    components: {
    TopNav,
    SwiperTop,
    IconList,
    MusicList
}
}
</script>

<style>

</style>
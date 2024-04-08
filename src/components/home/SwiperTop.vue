<template>
  <div>

    <div class="swiperTop">
      <van-swipe :autoplay="3000" lazy-render>
        <van-swipe-item v-for="image in state.images" :key="image">
          <img :src="image.pic" />
        </van-swipe-item>
      </van-swipe>
    </div>

  </div>
</template>

<script>
import { onMounted, reactive } from 'vue';
import { Getswiper } from '../../requerst/api/home'
export default {
  setup() {
    const state = reactive({
      images: []
    })
    onMounted(() => {

      Getswiper()
        .then((respon) => {
          state.images = respon.data.banners
          console.log('请求成功', respon.data.banners)
        })
        .catch((error) => {
          console.log('请求失败', error.message)
        })
    })
    return { state };
  },
}
</script>

<style lang="less" scoped>
.swiperTop {
  .van-swipe {
    width: 100%;

    .van-swipe__track {
      .van-swipe-item {
        img {
          width: 100%;
          height: 4rem;
          border-radius: .3rem;
        }

        /deep/.van-swipe__indicators--active {
          background: red !important;
        }
      }

    }
  }
}
</style>
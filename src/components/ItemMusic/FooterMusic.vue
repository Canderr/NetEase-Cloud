<template>
  <div>

    <div class="footerMusic">

      <div class="footerleft" @click="showPopup">
        <img :src="playlist[playlistIndex].al.picUrl" />
        <div>
          <span>{{ playlist[playlistIndex].name }}</span><br>
          <span>横滑切换上下首哦</span>
        </div>
      </div>

      <div class="footerright">
        <svg class="icon" aria-hidden="true" @click="play()">
          <use :xlink:href="state.Isplay ? '#icon-zanting' : '#icon-bofang'"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-zu"></use>
        </svg>
      </div>
      <audio ref="audio" @ended="overaudio()" @timeupdate="updatetime" @durationchange="alltime"
        :src="`https://music.163.com/song/media/outer/url?id=${playlist[playlistIndex].id}.mp3`"></audio>
    </div>

    <van-popup v-model:show="showBottom" position="bottom" :style="{ height: '100%', with: '100%' }">
      <MusicDeatil :musiclist="playlist[playlistIndex]" :play="play" :Isplay="state.Isplay"></MusicDeatil>
    </van-popup>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed, ref, reactive, watch, onMounted } from 'vue'
import MusicDeatil from './MusicDeatil.vue';
import { Getmuslrc } from '../../requerst/api/musicitem'
export default {
  setup() {
    const store = useStore()
    const playlist = computed(() => store.state.playlist)
    const playlistIndex = computed(() => store.state.playlistIndex)
    const showBottom = computed(() => store.state.showBottom)
    const state = reactive({
      Isplay: false,
    })
    //获取Dom节点属性
    const audio = ref(null)
    //底部播放功能
    function play() {
      state.Isplay = !state.Isplay
      if (state.Isplay) {
        audio.value.play()
      } else {
        audio.value.pause()
      }
    }
    //首歌曲歌曲播放完毕功能
    function overaudio() {
      //自动播放下一首
      store.commit('updatePlaylistNextMusic')
    }
    //歌曲当前播放时长
    function updatetime(e){
      store.commit('updatecurrentTime',e.target.currentTime)
      // console.log(e)
    }
    //获取歌曲总时长
    function alltime(e){
       store.commit('updateallaTime', e.target.duration)
      console.log(audio)
    }
    //弹出层
    const showPopup = () => {
      store.commit('OpenPopup')
    }
    //监听playlistIndex改变实现相应的功能
    watch(playlistIndex, (newval, oldval) => {
      //监听playlistIndex的变化实现自动播放
      audio.value.autoplay = true
      //判读歌曲是否正在播放，切换播放和暂停的图标
      if (audio.value.play) {
        state.Isplay = true
      } else {
        state.Isplay = false
      }
      //切換歌詞
      store.dispatch('Getmuslrc', playlist.value[playlistIndex.value].id)
    })

    onMounted(() => {
      //获取单首歌词
      store.dispatch('Getmuslrc', playlist.value[playlistIndex.value].id)
    })
    return {
      play,
      showPopup,
      overaudio,
      updatetime,
      alltime,
      audio,
      state,
      playlist,
      playlistIndex,
      showBottom,
    }
  },
  components: {
    MusicDeatil
  }
}
</script>

<style lang="less" scoped>
.footerMusic {
  width: 100%;
  height: 1.4rem;
  background-color: #fff;
  position: fixed;
  bottom: 0;
  border-top: 1px solid #999;
  display: flex;
  justify-content: space-between;
  align-items: center;

  // padding: .2rem;
  .footerleft {
    width: 60%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;

    img {
      height: 1rem;
      width: 1rem;
      border-radius: 50%;
    }
  }

  .footerright {
    width: 20%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;

    .icon {
      height: .6rem;
      width: .6rem;
    }
  }
}
</style>
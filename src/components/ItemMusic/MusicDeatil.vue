<template>
  <div>

    <img :src="musiclist.al.picUrl" alt="" class="bgimg">

    <div class="detailTop">
      <div class="detailTopLeft">
        <svg class="icon" aria-hidden="true" @click="ClosePopup()">
          <use xlink:href="#icon-zuojiantou"></use>
        </svg>
        <div class="detailTopLeft-midel">
          <!-- <marquee behavion="scroll">
            <p>{{ musiclist.name }}</p>
            <span v-for="item in musiclist.ar" :key="item">{{ item.name }}</span>
          </marquee> -->
        </div>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xiangyoujiantou"></use>
        </svg>
      </div>

      <div class="detailTopRight">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-fenxiang_o"></use>
        </svg>
      </div>

    </div>

    <div class="deatilContent" v-show="state.Isshowmusiclyrc" @click="state.Isshowmusiclyrc = !state.Isshowmusiclyrc">
      <img src="../../assets/img/changzhen.png" alt="" class="img_need" :class="{ img_need_active: Isplay }">
      <img src="../../assets/img/cd.png" alt="" class="img_cd">
      <img :src="musiclist.al.picUrl" alt="" class="img_al" :class="{ img_al_paused: !Isplay, img_al_active: Isplay }" />
    </div>

    <div class="musiclyc" ref="musiclyc" v-show="!state.Isshowmusiclyrc"
      @click="state.Isshowmusiclyrc = !state.Isshowmusiclyrc">
      <p v-for="(item, index) in  handlemusiclyrc" :key="index" :class="{ active: (isre(item, handlemusiclyrc, index)) }">
        {{ item.lrc }}
      </p>
    </div>

    <div class="deatilFooter">
      <div class="deatilFooterTop">
        <svg class="icon" aria-hidden="true" v-for="(item, index) in state.deatiltopicon" :key="index">
          <use :xlink:href="item"></use>
        </svg>
      </div>

      <div class="deatilFooterContent">
        <input type="range" class="range" :value="currentTime" min="0" :max="allTime"  step="0" 
        :onchange="ChangeMuscCurrentiTime()">
      </div>

      <div class="footer">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="icon-xunhuan"></use>
        </svg>
        <svg class="icon" aria-hidden="true" @click="previousmusic()">
          <use xlink:href="#icon-shangyishoushangyige"></use>
        </svg>
        <svg class="icon" aria-hidden="true" @click="play()">
          <use :xlink:href="Isplay ? '#icon-zanting' : '#icon-bofang'"></use>
        </svg>
        <svg class="icon" aria-hidden="true" @click="nextmusic()">
          <use xlink:href="#icon-xiayigexiayishou"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-zu"></use>
        </svg>
      </div>
    </div>

  </div>
</template>

<script>
import { useStore } from 'vuex';
import { reactive, onMounted, computed, watch, ref } from 'vue';
export default {
  setup(props) {
    const store = useStore()    //接受父組件传过来的单首播放曲
    const musiclist = props.musiclist
    const musiclyrc = computed(() => store.state.musiclyrc)//从vuex中获取歌曲单词
    const currentTime = computed(() => store.state.currentTime)//从vuex中接受歌曲播放时间
    const allTime = computed(()=>store.state.allTime)//歌曲总时间
    const musiclyc = ref()
    const state = reactive({
      deatiltopicon: ['#icon-aixin', '#icon-xiazai', '#icon-yinlechangpian', '#icon-xiaoxi', '#icon-liebiao-'],
      Isshowmusiclyrc: true,//控制是否展示歌词或磁盤
    })

    //关闭弹出层
    function ClosePopup() {
      store.commit('ClosePopup')
    }
    //分割处理歌词和时间
    const handlemusiclyrc = computed(() => {
      let arr
      if (musiclyrc.value) {
        // item为数组的每一项,inex为数组的下标
        arr = musiclyrc.value.split(/[(\r\n)\r\n]+/).map((item, index) => {
          let min = item.slice(1, 3)//分
          let sec = item.slice(4, 6)//秒
          let mill = item.slice(7, 10)//毫秒
          let lrc = item.slice(11, item.lenght)//歌詞
          let time = parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill)//当前播放歌词时间
          //判断毫秒是否为纯数字，重新切割字符串
          if (isNaN(Number(mill))) {
            mill = item.slice(7, 9)
            lrc = item.slice(10, item.lenght)
            time = parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill)//歌词当前时间时间
          }
          return { min, sec, mill, lrc, time }
        })
      }
      return arr
    })

    //歌词岁播放时间显示高亮
    function isre(item, handlemusiclyrc, index) {
      //判断当前播放时间和歌词时间是否对应
      if (currentTime.value * 1000 > item.time && currentTime.value * 1000 < handlemusiclyrc[index + 1].time) {
        return true
      } else {
        return false
      }
    }
    //滑动滑块，改变当前播放时间
    function ChangeMuscCurrentiTime(){
      console.log("123")
    }
    //监听歌曲播放歌词实现歌词滚动
    watch(currentTime, (newvalue, oldvalue) => {
      let handmuslic = document.querySelector("p.active")
      if (handmuslic && handmuslic.offsetTop > 366) {
        musiclyc.value.scrollTop = handmuslic.offsetTop - 300
      }
    }, { deep: true, })
    // 切換上一首歌曲
    function previousmusic(){
      store.commit('updatePlaylistpreviouMusic')
    }
    // 切換下一首歌曲
    function nextmusic(){
      store.commit('updatePlaylistNextMusic')
    }
    onMounted(() => {
    })
    return {
      ClosePopup,
      isre,
      previousmusic,
      nextmusic,
      ChangeMuscCurrentiTime,
      handlemusiclyrc,
      state,
      musiclyrc,
      handlemusiclyrc,
      currentTime,
      musiclyc,
      allTime
    }
  },
  props: ['musiclist', 'play', 'Isplay']
}
</script>

<style lang="less" scoped>
.bgimg {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -1;
  filter: blur(70px);
}

.detailTop {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .detailTopLeft {
    display: flex;
    // justify-content: space-around;
    align-items: center;

    .detailTopLeft-midel {
      width: 1.5rem
    }
  }

  .detailTopRight {
    
  }

}

.deatilContent {
  width: 100%;
  height: 9rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  .img_need {
    width: 2rem;
    height: 3rem;
    position: absolute;
    left: 48%;
    transform-origin: 0 0;
    transform: rotate(-10deg);
    transition: all 2s;
  }

  .img_need_active {
    width: 2rem;
    height: 3rem;
    position: absolute;
    left: 48%;
    transform-origin: 0 0;
    transform: rotate(4deg);
    transition: all 2s;
  }

  .img_cd {
    width: 5rem;
    height: 5rem;
    position: absolute;
    bottom: 2.3rem;
    z-index: -1;
  }

  .img_al {
    width: 3.2rem;
    height: 3.2rem;
    border-radius: 50%;
    position: absolute;
    bottom: 3.2rem;
    animation: rotate 10s linear infinite;
  }

  .img_al_active {
    animation-play-state: running;
  }

  .img_al_paused {
    animation-play-state: paused;
  }

  @keyframes rotate {
    0% {
      transform: rotateZ(0deg);
    }

    100% {
      transform: rotateZ(360deg);
    }
  }
}

.musiclyc {
  width: 100%;
  height: 9rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
  overflow: scroll;

  p {
    margin-bottom: .4rem;
  }

  .active {
    color: #fff;
    font-size: .4rem;
  }
}

.deatilFooter {
  width: 100%;
  height: 3rem;
  position: absolute;
  bottom: 0;

  .deatilFooterTop {
    height: 1rem;
    display: flex;
    justify-content: space-between;

    .icon {
      fill: #fff;
    }
  }

  .deatilFooterContent {
    height: 1rem;

    input[type=range] {
      // -webkit-appearance: none;
      width: 100%;
      background: -webkit-linear-gradient(#61bd12, #61bd12) no-repeat, #ddd;
      /*设置左右宽度比例*/
      height: 3px;
    }

    input[type=range]::-webkit-slider-thumb {
      -webkit-appearance: none;
      /*清除系统默认样式*/
      height: 26px;
      /*拖动块高度*/
      width: 26px;
      /*拖动块宽度*/
      background: #fff;
      /*拖动块背景*/
      border-radius: 50%;
      /*外观设置为圆形*/
      border: solid 1px #ddd;
      /*设置边框*/
    }

    .range {
      width: 99%;
      background: blue;
    }
  }

  .footer {
    display: flex;
    justify-content: space-between;
    height: 1rem;

    .icon {
      fill: #fff;
    }
  }
}
</style>




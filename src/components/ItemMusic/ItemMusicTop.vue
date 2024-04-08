<template>
  <div>

    <div class="iteemMusicTop">
      <img :src="playlist.coverImgUrl" alt="">
      <div class="itemMusicTopleft">
        <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
          <use xlink:href="#icon-zuojiantou"></use>
        </svg>
        <span>歌单</span>
      </div>

      <div class="itemMusicTopright">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-sousuo"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-31liebiao"></use>
        </svg>
      </div>

    </div>

    <div class="iteeMusicMideel">

      <div class="iteeMusciMideelOne">

        <div class="iteeMusciMideeOne-left">
          <img :src="playlist.coverImgUrl" alt="">
        </div>

        <div class="iteeMusciMideeOne-right">
          <span>
            我是lxyyyyss
          </span>

          <div class="iteeMusciMideeOne-right-two">

            <div class="iteeMusciMideeOne-right-twoimage">
              <img :src="playlist.creator.avatarUrl" alt="">
              <span>{{ playlist.creator.nickname }}</span>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-xiangyoujiantou"></use>
              </svg>
            </div>

          </div>

          <div class="iteeMusciMideeOne-right-thre"><span>{{ playlist.creator.signature }}</span></div>
        </div>

      </div>

    </div>

    <div class="iteeMusicFoolter">
      <div class="iteeMusicFoolter-item">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xiaoxi"></use>
        </svg>
        <span>123</span>
      </div>
      <div class="iteeMusicFoolter-item">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-fenxiang_o"></use>
        </svg>
        <span>123</span>
      </div>
      <div class="iteeMusicFoolter-item">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xiazai"></use>
        </svg>
        <span>下载</span>
      </div>
      <div class="iteeMusicFoolter-item">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-show_duoxuan"></use>
        </svg>
        <span>多选</span>
      </div>
    </div>
  </div>
</template>

<script>
import { toRaw } from 'vue'
export default {
  setup(props) {
    console.log(props)
    //通過props传值，判断如果数据拿不到，就读取sessionStorage的
    if ((props.playlist.creator = '')) {
      props.playlist.creator = JSON.parse(sessionStorage.getItem().playlist).creator
    }
  },
  props: ['playlist']
}
</script>

<style lang="less" scoped>
.iteemMusicTop {
  height: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .itemMusicTopleft,
  .itemMusicTopright {
    width: 25%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    justify-items: center;
    margin-right: .2rem;
    margin-left: .2rem;

    span {
      font-size: .4rem;
      color: #fff;
    }

    .icon {
      fill: #fff
    }
  }

  img {
    width: 100%;
    height: 11rem;
    position: absolute;
    z-index: -1;
    filter: blur(15px); //背景虛化
  }
}

.iteeMusicMideel {
  .iteeMusciMideelOne {
    display: flex;
    justify-content: space-around;
    color: #fff;

    .iteeMusciMideeOne-left {
      img {
        height: 3.5rem;
        width: 3.5rem;
        border-radius: .4rem;
      }
    }

    .iteeMusciMideeOne-right {
      width: 45%;
      word-break: break-all;

      .iteeMusciMideeOne-right-thre {
        margin-top: .3rem;
      }

      .iteeMusciMideeOne-right-two {
        margin-top: .6rem;

        .iteeMusciMideeOne-right-twoimage {
          display: flex;
          // justify-content: space-around;
          align-items: center;

          img {
            width: 1rem;
            height: 1rem;
            border-radius: 50%;
          }

          .icon {
            width: 1em;
            height: 1em;
            fill: #fff
          }
        }
      }
    }
  }
}

.iteeMusicFoolter{
  color: #fff;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: .4rem;
  .iteeMusicFoolter-item{
    display: flex;
    flex-direction: column;
    align-items: center;
    .icon{
      fill: #fff;
    }
  }
}
</style>
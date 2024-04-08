import { createStore } from 'vuex'
import { Getitemmusiclibretto } from '../requerst/api/musicitem'
export default createStore({
  state: {
    //播放列表歌單
    playlist: [

      {
        name: "网易云音乐",
        al: {
          id: 35702116,
          name: "网易云音乐",
          pic: 109951162964628420,
          picUrl: 'https://p1.music.126.net/TPck7lv3kqj9x_iXqx7mOQ==/109951163692316285.jpg',
          pic_str: "109951162964628408"
        },
        id: 488249475
      }
    ],
    playlistIndex: 0,//默认播放列表下标
    showBottom: false,// 控制歌弹出层开关
    musiclyrc: {},//存储单首歌词
    currentTime: 0,//歌曲当前时间
    allTime: 0,//歌曲总时长
    Islogin:false,//判断用户是否登录
  },
  getters: {
  },
  mutations: {
    //更新播放列表数据
    updatePlayList(state, value) {
      state.playlist = value
      console.log(state.playlist)
    },
    //点击歌曲更换播放列表下标,播放点击的对应歌曲
    updatePlaylistIndex(state, value) {
      state.playlistIndex = value
    },
    //播放下一首
    updatePlaylistNextMusic(state) {
   
      //如果播放的是最後一首歌曲時，禁止播放下一首
      if (state.playlistIndex === state.playlist.length-1) {
        state.playlistIndex = 0
      }else{
        state.playlistIndex += 1
      }
    },
    //切换上一首一首歌曲
    updatePlaylistpreviouMusic(state) {
    
      //播放的是第一首時候，禁止播放上一首
      if (state.playlistIndex == 0) {
        state.playlistIndex = 0
      }else{
        state.playlistIndex -= 1
      }

    },
    //控制弹出层打开
    OpenPopup(state) {
      state.showBottom = true
    },
    //控制弹出层关闭
    ClosePopup(state) {
      state.showBottom = false
    },
    // 切换歌曲更新歌词
    updatemusiclyrc(state, value) {
      state.musiclyrc = value
    },
    // 更新歌曲当前时间
    updatecurrentTime(state, value) {
      state.currentTime = value
    },
    //更新歌曲总时长
    updateallaTime(state, value) {
      state.allTime = value
    },
    // 添加搜索歌曲进播放列表
    pushplaylist(state,value){
      state.playlist.push(value)
    }
  },
  actions: {
    //发送请求获取歌曲歌词
    Getmuslrc(context, value) {
      Getitemmusiclibretto(value)
        .then((response) => {
          console.log('歌词', response)
          context.commit('updatemusiclyrc', response.data.lrc.lyric)
        })
        .catch((error) => {
          console.log('歌词获取失败', error)
        })

    }
  },
  modules: {
  }
})

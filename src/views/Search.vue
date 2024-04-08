<template>
    <div>
        <div class="serachTop">
            <svg class="icon" aria-hidden="true" @click="goback">
                <use xlink:href="#icon-zuojiantou"></use>
            </svg>
            <input type="text" :placeholder="state.Hitsingles" v-model="state.searchkeword" @keydown.enter="Serachenter">
        </div>
        <div class="searchHistory">
            <div class="searchHistory-left">
                <span class="historwod">历史</span>
                <span v-for="(item, index) in state.Keywordlist" :key="index" class="historitem"
                    @click="searchhistor(item)">{{ item }}</span>
            </div>
            <div class="searchHistory-right">
                <svg class="icon" aria-hidden="true" @click="delHistory">
                    <use xlink:href="#icon-shanchu"></use>
                </svg>
            </div>
        </div>


        <div class="muisclist">
            <li v-for="(item, index) in state.serachlist" :key="index">
                <div class="muisclist-left" @click="playmusic(item, index)">
                    <span>{{ index + 1 }}</span>
                    <div class="muisclist-left-two">
                        <span>{{ item.name }}</span>
                        <span class="span2" v-for="(item,index) in item.artists" :key="index">{{ item.name }}</span>
                    </div>
                </div>

                <div class="muisclist-right">
                    <svg class="icon" aria-hidden="true" v-if="item.mvid">
                        <use xlink:href="#icon-shipin"></use>
                    </svg>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-31liebiao"></use>
                    </svg>
                </div>
            </li>
        </div>

    </div>
</template>

<script>
import { reactive, onMounted } from 'vue';
import {useRouter} from 'vue-router'
import { Getsearchmusic } from '../requerst/api/musicitem'
import {useStore} from 'vuex'
export default {
    name: 'Search',
    setup(props) {
        const router =  new useRouter()
        const store =  useStore()
        const state = reactive({
            Keywordlist: [],//保存历史记录关键字
            searchkeword: '',
            Hitsingles: ['周杰伦'],//热门歌手
            serachlist: [],//搜索列表歌曲

        })
        onMounted(() => {
            //页面刷新页面，从本地存储中获取数据
            if (JSON.parse(localStorage.getItem('Keywordlist'))) {
                state.Keywordlist = JSON.parse(localStorage.getItem('Keywordlist'))
            } else {
                state.Keywordlist = []
            }
        })
        //回车搜索功能
        function Serachenter() {
            if (state.searchkeword != '') {
                state.Keywordlist.unshift(state.searchkeword)
                //数组去重
                state.Keywordlist = [... new Set(state.Keywordlist)]
                //保存到本地存儲中，防止刷新数据丢失
                localStorage.setItem('Keywordlist', JSON.stringify(state.Keywordlist))
                // /限制历史的长度
                if (state.Keywordlist.length > 7) {
                    state.Keywordlist.splice(state.Keywordlist.length - 1, 1)
                }

                //发送axios 請求獲取歌曲
                Getsearchmusic(state.searchkeword)
                    .then((respon) => {
                        console.log('获取歌曲成功', respon)
                        state.serachlist = respon.data.result.songs
                        console.log(state.serachlist)
                    })
                    .catch((error) => {
                        console.log('獲取歌曲失敗', error)
                    })
                //清除輸入框
                state.searchkeword = ''
            } else {
                return
            }

        }
        //刪除历史记录
        function delHistory() {
            localStorage.removeItem('Keywordlist')
            state.Keywordlist = []
        }
        //点击历史记录实现搜索
        function searchhistor(item) {
            //发送axios 請求獲取歌曲
            Getsearchmusic(item)
                .then((respon) => {
                    console.log('获取歌曲成功', respon)
                    state.serachlist = respon.data.result.songs
                    console.log(state.serachlist)
                })
                .catch((error) => {
                    console.log('獲取歌曲失敗', error)
                })
        }
        //点击搜索歌曲播放
        function playmusic(item,index){
            item.al=item.album
            item.al.picUrl = item.album.artist.img1v1Url
            store.commit('pushplaylist',item)
            store.commit('updatePlaylistIndex',store.state.playlist.length-1)
            console.log(item)
        }
        //返回首页
        function goback(){
            router.go(-1)
        }
        return {
            state,
            Serachenter,
            delHistory,
            searchhistor,
            playmusic,
            goback
        }
    }
}
</script>

<style lang="less" scoped>
.serachTop {
    width: 100%;
    height: 1rem;
    display: flex;
    align-items: center;

    input {
        width: 90%;
        // margin-left: .2rem;
        padding: .1rem;
        border: none;
        border-bottom: 1px solid #999;
    }
}

.searchHistory {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: .2rem;

    .searchHistory-left {
        .historwod {
            font-weight: 900;
        }

        .historitem {
            display: inline-block;
            margin-left: .2rem;
            background: #e7e1e1;
            padding: .08rem;
            border-radius: .1rem;
        }
    }
}
.muisclist {
        li {
            list-style: none;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: .2rem 0.4rem;

            .muisclist-left {
                display: flex;
                align-items: center;

                .muisclist-left-two {
                    display: flex;
                    flex-direction: column;
                    margin-left: .2rem;
                    // height: 1rem;
                    line-height: .6rem;

                    .span2 {
                        color: rgb(185, 185, 185);
                    }
                }
            }

            .muisclist-right {
                .icon {
                    margin: .15rem;
                }
            }
        }
    }
</style>
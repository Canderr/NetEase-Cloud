<template>
    <div>

        <div class="itemMusicList">
            <div class="top">
                <div class="top-left">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-bofang1"></use>
                    </svg>
                    <span>播放全部</span>
                    <span>(共{{ itemList.length }}首)</span>
                </div>

                <div class="top-right">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-jiahao"></use>
                    </svg>
                    <span>收藏({{ playlist.subscribedCount }})</span>
                </div>
            </div>

            <div class="muisclist">
                <li v-for="(item, index) in itemList" :key="index">
                    <div class="muisclist-left" @click="playmusic(itemList, index)">
                        <span>{{ index + 1 }}</span>
                        <div class="muisclist-left-two">
                            <span>{{ item.name }}</span>
                            <span class="span2">{{ item.ar[0].name }}</span>
                        </div>
                    </div>

                    <div class="muisclist-right">
                        <svg class="icon" aria-hidden="true" v-if="item.mv">
                            <use xlink:href="#icon-shipin"></use>
                        </svg>
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-31liebiao"></use>
                        </svg>
                    </div>
                </li>
            </div>

        </div>

    </div>
</template>

<script>
import { reactive } from 'vue'
import { useStore } from 'vuex'
export default {
    setup(props) {
        const store = useStore()
        const state = reactive({

        })
        //点击播放并且切换播放单列表
        function playmusic(itemList, index) {
            store.commit('updatePlayList', itemList)
            store.commit('updatePlaylistIndex', index)
        }
        return { state, playmusic }
    },
    props: ['itemList', 'playlist']
}
</script>

<style lang="less" scoped>
.itemMusicList {
    border-top-left-radius: .3rem;
    border-top-right-radius: .3rem;
    background: rgb(255, 255, 255);

    .top {
        display: flex;
        justify-content: space-between;
        // margin-top: 0.2rem;
        padding-top: .3rem;

        .top-left {
            display: flex;
            align-items: center;
            justify-content: space-around;
            padding: 0.1rem;
            margin-left: .2rem;

            .icon {
                margin-right: 10px;
            }
        }

        .top-right {
            display: flex;
            align-items: center;
            justify-content: space-around;
            padding: 0.1rem;
            background: red;
            border-radius: .2rem;
            margin-right: .2rem;

            .icon {
                fill: #fff;
            }

            span {
                color: #fff;
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
}
</style>
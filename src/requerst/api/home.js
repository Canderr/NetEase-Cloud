import server from "..";
//获取轮播图数据
export function Getswiper(){
    return server.get('/banner?type=2')
}
//获取推荐歌单数据
export function Getgendan(){
    return server.get('/personalized?limit=10')
}

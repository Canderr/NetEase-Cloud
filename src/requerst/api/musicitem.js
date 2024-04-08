import server from "..";
//获取推荐歌单详情
export function Getitemmuscidetail(id) {
    return server.get('playlist/detail?id='+id)
}
//获取歌单列表数据
export function Getitemmusiclist(id){
    return server.get('playlist/track/all?id='+id)
}
export function Getitemmusiclibretto(id){
    return server.get('lyric?id='+id)
}
//搜索框搜索歌曲
export function Getsearchmusic(musickeyword){
    return server.get('search/suggest?keywords='+musickeyword)
}


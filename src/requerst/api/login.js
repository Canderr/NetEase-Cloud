import server from "..";
//二维码key生成接口
export function loginqrkey(timestamp){
    console.log('時間',timestamp)
    return server.get('/login/qr/key?timestamp='+timestamp+'&qrimg=true')
}
//二维码生成接口
export function logincreateqr(key,timestamp){
    console.log(timestamp)
    return server.get('/login/qr/create?key'+key+'&qrimg=true='+'&timestamp='+timestamp)
}
// 二维码检测扫码状态接口
export function logincheckqr(key,timestamp){
    return server.get('/login/qr/check?key='+key+'&timestamp='+timestamp)
}
<template>
  <div class="bibox">
    <div class="login">
      <h1>二维码登录</h1>
      <img :src="state.qrimg" />
      <h1>{{ state.message }}</h1>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted } from 'vue'
import { loginqrkey, logincreateqr, logincheckqr } from '../requerst/api/login'
export default {
  setup() {
    const state = reactive({
      qrimg: '',//二維碼
      key: '',
      message: ''
    })
    // 获取二维吗key
    async function getkey() {
      loginqrkey(Date.now())
        .then((respon) => {
          console.log(respon)
          state.key = respon.data.data.unikey
          creatqr()
        })
        .catch((error) => {
          console.log(error)
        })
    }
    // 生成二维吗
    function creatqr() {
      logincreateqr(state.key, Date.now())
        .then((respon) => {
          state.qrimg = respon.data.data.qrimg
          checkqr()
        })
        .catch((error) => {
          console.log('請求二維碼失敗', error)
        })
    }
    //檢查二维吗状态
    function checkqr() {
      logincheckqr(state.key, Date.now())
        .then((respon) => {
          state.message = respon.data.message
          if (respon.data.code === 801 || respon.data.code === 802) {
            setTimeout(() => {
              checkqr()
            }, 1000)
          }
          console.log(respon)
        })
        .catch((error) => {
          console.log('error', error)
        })
    }
    onMounted(() => {
      getkey()
      // checkqr()
    })
    return {
      state
    }
  }
}

</script>

<style lang="less" scoped>
.bibox {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  .login {
    margin-top: 50%;
    text-align: center;
  }

  .van-button {
    width: 3.5rem;
    margin-top: .7rem;
  }
}
</style>
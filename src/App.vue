<template>
  <div>
    <router-view />
    <FooterMusic></FooterMusic>
  </div>
</template>
<script>
import FooterMusic from './components/ItemMusic/FooterMusic.vue'
export default {
  name: 'App',
  components: {
    FooterMusic
  }
}
</script>
<style lang="less" >
.icon {
  width: .5rem;
  height: .5rem;
}
</style>

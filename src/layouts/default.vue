<template>
  <div class="wrap">
    <div class="content">
      <CoHeader />
      <AppMain />
    </div>
    <BackTop />
    <CoFooter />
  </div>
</template>

<script>
import BackTop from '@/components/BackTop'
import CoHeader from './Header'
import AppMain from './AppMain'
import CoFooter from './Footer'
export default {
  // name: 'CoBlog',
  components: { CoHeader, CoFooter, AppMain, BackTop }
}
/* eslint-disable */
console.log("%c CoBlog Version 1.0", "font-size:20pt;color:#FFA7A6")
</script>

<style scoped lang="stylus">
  .wrap
    position relative
    z-index 0
    display flex
    width 100%
    height 100%
    flex-direction column
    justify-content center
    .content
        background #FeFeFe
        min-height calc(100vh - 225px)
</style>

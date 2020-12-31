<template>
  <aside class="sidebar">
    <div class="avatar-user">
      <div class="avatar-bg" />
      <nuxt-link tag="div" to="/" class="user">
        <span class="text-name hover-active">
          {{ $store.getters.global.BLOG_AUTHOR }}
        </span>
        <img src="https://cdn.coblog.cn/avatar.jpg" alt="Collby" class="avatar">
        <p class="text-desc">
          {{ $store.getters.global.AUTHOR_DESCRIPTION }}
        </p>
      </nuxt-link>
    </div>
    <Tabs />
    <Player />
  </aside>
</template>
<script>
import Tabs from './Tabs'
import Player from './Player'

export default {
  name: 'SideInfo',
  components: { Tabs, Player }
}
</script>

<style scoped lang="stylus">
@import "~assets/css/theme"
@import "~assets/css/base"
.sidebar
  float: right
  position relative
  z-index 0
  box-sizing border-box
  padding 0 15px
  margin-bottom 80px
  width 30%
  @media (max-width 992px)
    display none
  .avatar-user
    position relative
    box-shadow $box-shadow
    background-color $background-color
    box-sizing border-box
    border-radius 5px
    overflow hidden
    .avatar-bg
      background url("https://cdn.coblog.cn/sky.jpg") no-repeat center center
      background-size cover
      height 120px
    .user
      position relative
      .text-name
        display flex
        font-size $font-size-big
        font-weight 700
        padding-top 7px
        margin-left 100px
      .avatar
        position absolute
        top -45px
        left 20px
        width 80px
        height 80px
        border rgba(255,255,255,.4) 4px solid
        box-sizing border-box
        border-radius 50%
        transition all .5s
        &:hover
          transform rotateZ(360deg)
      .text-desc
        padding 0 15px 0 15px
        font-size $font-size-small
        line-height 1.5em
        color $minor-color
</style>

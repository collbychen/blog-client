<template>
  <transition name="fade">
    <div v-show="visible" class="header-wrapper">
      <!--      <Blur />-->
      <header class="header">
        <div class="logo">
          <nuxt-link style="text-decoration: none" to="/">
            <h2 class="unfold">
              Collby
            </h2><h2>Blog</h2>
          </nuxt-link>
        </div>
        <div class="smallLogo">
          CoBlog
        </div>
        <NavBar />
        <Search />
        <User />
      </header>
    </div>
  </transition>
</template>

<script>
import NavBar from './NavBar'
import Search from './Search'
import User from './User'

const OFFSET_HEIGHT = 70

export default {
  name: 'CoHeader',
  components: { User, Search, NavBar },
  data () {
    return {
      visible: true
    }
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll () {
      const offsetTop = window.pageYOffset || document.documentElement.scrollTop
      this.visible = offsetTop < OFFSET_HEIGHT
    }
  }
}
</script>

<style scoped lang="stylus">
@import "~assets/css/theme"
.header-wrapper
    background $background-color
    position fixed
    top 0
    left 0
    right 0
    z-index 300
    border-bottom 1px solid #f1f1f1
    height 80px
    overflow hidden
    @media  (max-width 768px)
        height 50px
    &.fade-enter-active, &.fade-leave-active
        transition all .2s
    &.fade-enter, &.fade-leave-to
        transform translateY(-75px)
.header
    height 100%
    margin 0 auto
    position relative
    display flex
    justify-content center
    align-content center
    .logo
        padding-left 10px
        cursor pointer
        h2
            font-size $font-size-title
            color rgba(0,0,0,.5)
            transition 1s
            float: left
        .unfold
            width 1.3 em
            overflow hidden
            withe-space: nowrap
        &:hover
            h2
                color $active-color
            .unfold
                width 3.2 em
        @media (max-width 780px)
            display none
    .smallLogo
        float left
        margin auto
        width 40%
        font-size $font-size-title
        color rgba(0,0,0,.5)
        @media (min-width 780px)
            display none
    @media  (min-width 768px)
        width 100%
    @media  (min-width 1024px)
        width 1024px
    @media  (min-width 1199px)
        width 1100px
</style>

<template>
  <transition name="scroll">
    <div v-if="visible && isBig" class="back-wrapper " @click="handleTo" />
    <div v-if="visible && !isBig" class="min-back" @click="handleTo">
      <i style="font-size: 30px" class="el-icon-caret-top" />
    </div>
  </transition>
</template>

<script>
import { throttle } from '@/utils'

let scrollTo
if (process.client) {
  scrollTo = require('@/utils/scroll-to').scrollTo
}

const MAX_WIDTH = 1200
export default {
  name: 'BackTop',
  props: {
    visibilityHeight: {
      type: Number,
      default: 100
    }
  },
  data () {
    return {
      isBig: true,
      visible: false
    }
  },
  mounted () {
    this.handleResize()
    window.addEventListener('scroll', this.handleScroll)
    window.addEventListener('resize', throttle(this.handleResize, 500))
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
    window.addEventListener('resize', this.handleResize)
  },
  methods: {
    handleTo () {
      scrollTo(0, 800)
    },
    handleScroll () {
      const offsetTop = document.body.scrollTop || document.documentElement.scrollTop
      this.visible = offsetTop > this.visibilityHeight
    },
    handleResize () {
      // 切换backTop
      const { width } = document.documentElement.getBoundingClientRect()
      this.isBig = width > MAX_WIDTH
    }
  }
}

</script>

<style scoped lang="stylus">
  @import "~@/assets/css/theme"
  .back-wrapper
    cursor pointer
    position fixed
    right 60px
    top 750px
    width 80px
    height 80px
    border-radius 50%
    background $background-color
    box-shadow 0 0 5px rgba(0,0,0,.8)
    align-items center
    animation move 3s infinite
    z-index 999
    background url("../../assets/images/cat33.png") no-repeat center bottom
    background-size: 90px 90px
    &.scroll-enter-active, &.scroll-leave-active
      transition all .7s
    &.scroll-enter, &.scroll-leave-to
      right -900px
    @media  (max-width 1200px)
      display none
  .min-back
    cursor pointer
    position fixed
    right 20px
    bottom 80px
    width 40px
    height 40px
    border-radius 50%
    background $background-color
    box-shadow 0 0 5px rgba(0,0,0,.8)
    text-align center
    &:hover
      box-shadow 0 0 5px rgba(0,0,0,.2)
    i
      margin 0 auto
      position relative
      top 10%
  @keyframes move
    0% {
      transform translateY(0)
    }
    50% {
      transform translateY(-10px)
    }
    100% {
      transform translateY(0)
    }
</style>

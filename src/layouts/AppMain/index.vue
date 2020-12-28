<template>
  <section class="main-wrap">
    <div class="app-main">
      <div class="fl">
        <transition name="fade-transform" mode="out-in">
          <nuxt :key="$route.fullPath"/>
        </transition>
      </div>
      <side-info />
    </div>
  </section>
</template>

<script>

import SideInfo from './SideInfo'

export default {
  name: 'AppMain',
  components: { SideInfo },
  data () {
    return {
      show: false
    }
  },
  watch: {
    '$route.path' (newVal) {
      newVal !== '/' ? this.show = false : this.show = true
    }
  },
  mounted () {
    const path = this.$route.path
    path !== '/' ? this.show = false : this.show = true
  }
}
</script>

<style scoped lang="stylus">
    @import "~@/assets/css/theme"
    .main-wrap
        position relative
        width 100%
        margin-top 75px
        @media (max-width 992px)
            margin-top 50px
        .app-main
            position relative
            margin 100px auto
            @media (min-width: 768px)
                width 100%
            @media (min-width: 992px)
                width 970px
            @media (min-width: 1200px)
                width 1170px
            @media (max-width: 768px)
                top -30px
            .fl
                float left
                padding-bottom 50px
                width 70%
                .fade-transform-leave-active, .fade-transform-enter-active
                    transition all 0.5s
                .fade-transform-enter
                    opacity 0
                    transform translateX(-30px)
                .fade-transform-leave-to
                    opacity 0
                    transform translateX(30px)
                @media (max-width: 992px)
                    width 100%
                @media (max-width: 768px)
                    width 100%
</style>

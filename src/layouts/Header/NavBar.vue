<template>
  <div class="site-nav">
    <nav class="mobile-fit-control">
      <el-dropdown class="dropdownMenu">
        <span class="el-dropdown-link">
          {{ curNav }}<i class="el-icon-arrow-down el-icon--right" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-for="item in navList" :key="item.title" :command="item.title">
            <nuxt-link :to="item.path" style="text-decoration:none; color:#666;">
              <template>
                {{ item.title }}
              </template>
            </nuxt-link>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <ul class="menu">
        <nuxt-link v-for="item in navList" :key="item.title" :to="item.path" tag="li" class="menu-item">
          <template v-if="!item.hidden">
            {{ item.title }}
          </template>
        </nuxt-link>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  data () {
    return {
      curNav: '首页',
      navList: [
        {
          title: '首页',
          path: '/'
        },
        {
          title: '归档',
          path: '/archive'
        },
        {
          title: '分类',
          path: '/category'
        },
        {
          title: '标签',
          path: '/tag'
        },
        {
          title: '关于',
          path: '/about'
        }
      ]
    }
  }
}
</script>

<style scoped lang="stylus">
    @import "~@/assets/css/theme"
    @import '~@/assets/css/animation'
    .site-nav
        margin auto 0
        width 50%
        .mobile-fit-control
            width 100%
            font-size $font-size-medium
            .dropdownMenu
                float right
                margin 0 10px
                @media  (min-width 996px)
                    display none
            .menu
                width 100%
                height 100%
                margin 0
                @media  (max-width 996px)
                    margin 0
                    display none
                    .menu-item
                        flex 1
                        margin 0!important
                        padding 0!important
                .menu-item
                    margin 0 15px
                    padding 0 3px
                    color $font-color
                    text-align center
                    line-height 50px
                    float left
                    position relative
                    cursor pointer
                    list-style: none
                    &:before
                        content ''
                        position absolute
                        left 50%
                        bottom 0
                        width 0
                        height 2px
                        background-color $active-color
                        transition all .3s ease
                    &:hover
                        color $active-color
                        &:before
                            width @width // 获取父级的宽度
                            left 0
    @media (max-width: 996px)
        .site-nav
            width 30%
            .mobile-fit-control
                height 100%
                position relative
</style>

<template>
  <div class="hot-article">
    <div class="header hover-active">
      <svg-icon name="fire" :style-obj="{ width: '1em', height: '1em' }" />
      <h1 class="title">
        热门文章
      </h1>
    </div>
    <ArticleBar :list="list" />
  </div>
</template>

<script>
import ArticleBar from './components/ArticleBar'
export default {
  name: 'Tabs',
  components: { ArticleBar },
  data () {
    return {
    }
  },
  computed: {
    list () {
      return this.$store.state.article.hotList
    }
  },
  created () {
    // 不需要响应
    this.num = 0
  },
  methods: {
  }
}
</script>

<style lang="stylus" >
  @import "~@/assets/css/theme"
  @import "~@/assets/css/base"
  .hot-article
    position relative
    border-radius 5px
    margin 15px 0
    padding 15px 10px
    background-color $background-color
    box-shadow $box-shadow
    .header
      display flex
      justify-content flex-start
      align-items center
      padding 0 10px 10px 10px
      .title
        margin 0 5px
        align-self center
        font-size $font-size-medium
</style>

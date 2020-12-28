<template>
  <div class="app-wrapper">
    <div class="videoWarp">
      <input id="slide_1" type="radio" name="select" checked>
      <input id="slide_2" type="radio" name="select">
      <input id="slide_3" type="radio" name="select">
      <div class="slider">
        <label for="slide_1" class="slide slide_1" />
        <label for="slide_2" class="slide slide_2" />
        <label for="slide_3" class="slide slide_3" />
      </div>
      <div class="inner_part">
        <video class="video s1" src="https://cdn.coblog.cn/yingchuyin.mp4" autoplay muted loop />
      </div>
      <div class="inner_part">
        <video class="video s2" src="https://cdn.coblog.cn/xiannvzuo.mp4" autoplay muted loop />
      </div>
      <div class="inner_part">
        <video class="video s3" src="https://cdn.coblog.cn/jiatenghui.mp4" autoplay muted loop />
      </div>
    </div>
    <div class="line">
      <div class="text">
        最新文章
      </div>
    </div>
    <div class="article-wrapper">
      <article v-for="item in list" :key="item.id" class="article-con">
        <nuxt-link v-if="item.imageUrl" class="article-t" :to="{ name: 'article-id', params: { id: item.id } }" tag="div">
          <div class="item-pic">
            <img v-lazy="item.imageUrl" alt="悠然小宋">
          </div>
        </nuxt-link>
        <div class="article-b">
          <nuxt-link class="title" :to="{ name: 'article-id', params: { id: item.id } }" tag="h2">
            {{ item.title }}
          </nuxt-link>
          <p v-if="item.description" class="desc">
            {{ item.description }}
          </p>
          <p v-else class="desc">
            暂时无可提供的摘要
          </p>
          <div class="line" />
          <div class="entry-meta">
            <span class="m-r-sm">{{ formatToDate(item.createTime) }}</span>
            <span class="m-r-sm">{{ item.visits }}次围观</span>
            <span class="m-r-sm">{{ item.comments }}条评论</span>
          </div>
        </div>
      </article>
      <div v-if="hasArticle" class="more hover-active" @click="loadMoreArticle()">
        <h3>加载更多文章</h3>
      </div>
      <div v-else class="none">
        没有更多文章了
      </div>
    </div>
  </div>
</template>

<script>
import { formDate } from '@/utils'

export default {
  name: 'Index',
  data () {
    return {
      page: 1,
      list: [],
      hasArticle: true
    }
  },
  mounted () {
    this.getList(this.page)
  },

  methods: {
    formatToDate (v) {
      return formDate(v)
    },
    loadMoreArticle () {
      this.page = this.page + 1
      this.getList(this.page)
    },
    async getList (page) {
      const { data } = await this.$axios.$get(`articles/list?page=${page}`)
      if (data.list.length) {
        this.list = this.list.concat(data.list)
      } else {
        this.hasArticle = false
      }
    }
  },
  head () {
    return {
      title: '首页-小宋博客',
      meta: [
        { hid: 'home', name: 'description', content: '小宋-个人博客' }
      ]
    }
  }
}
</script>

<style scoped lang="stylus">
    @import "~@/assets/css/theme"
    @import "~@/assets/css/base"
    .app-wrapper
        /*background aqua*/
        font-size $font-size-small
        color $font-color
        padding 0 10px
        .videoWarp
            position relative
            border-radius 10px
            width 100%
            height 350px
            margin-bottom: 20px
            box-shadow $box-shadow
            @media (max-width 500px)
                display none
            input
                display none
            .inner_part
                height 350px
                position: absolute
                display flex
                justify-content center
                align-items center
                .video
                    z-index -1
                    opacity 0
                    transition 0.6s
                    width 100%
                    border-radius 10px
                    height 100%
                    object-fit fill
            .slider
                position absolute
                bottom 25px
                left 50%
                transform translateX(-50%)
                z-index 999
                .slide
                    position relative
                    height 10px
                    width 50px
                    background $border-line-color
                    border-radius 5px
                    display inline-flex
                    margin 0 3px
                    cursor pointer
                    &:before
                        position absolute
                        content ""
                        top 0
                        left 0
                        height 100%
                        width -100%
                        background #000
                        border-radius 10px
                        transform scaleX(0)
                        transition transform 0.6s
                        transform-origin left
            #slide_1:checked ~ .slider .slide_1:before,
            #slide_2:checked ~ .slider .slide_2:before,
            #slide_3:checked ~ .slider .slide_3:before
                transform scaleX(1)
                width 100%
            #slide_1:checked ~ .inner_part .s1,
            #slide_2:checked ~ .inner_part .s2,
            #slide_3:checked ~ .inner_part .s3
                opacity 1
                margin-left 0
                z-index 1
                transition-delay 0.3s
        .line
            position relative
            display inline-block
            width 100%
            height 5px
            margin 30px 0
            background #f2f2f2
            box-sizing: border-box
            .text
                position absolute
                left 50%
                top 50%
                margin: 0
                text-align: center
                padding-left: 20px
                padding-right: 20px
                font-size: 20px
                text-transform: uppercase
                background $background-color
                transform: translate(-50%, -50%);
                -webkit-transform: translate(-50%, -50%);
                -moz-transform: translate(-50%, -50%);
                -o-transform: translate(-50%, -50%);
                color: $font-color
        .article-wrapper
            font-size $font-size-small
            padding 0 10px
            display flex
            flex-direction column
            @media (max-width 500px)
                .article-con
                    display block!important
                .article-t
                    margin 0!important
                .item-pic
                    min-height 150px!important
                .article-b
                    padding 10px 20px!important
                .title
                    margin 5px 0!important
                .desc
                    margin 5px 0!important
            .article-con
                position relative
                width 100%
                display flex
                background-color $background-color
                margin-bottom 15px
                overflow hidden
                box-shadow $box-shadow
                background $background-color
                border-radius 5px
                .article-t
                    cursor pointer
                    flex 0 0 40%
                    margin 20px
                    overflow hidden
                .item-pic
                    width 100%
                    height 100%
                    background-position 50% 50%
                    background-size cover
                    transition all .4s
                    img
                        height 100%
                        width 100%
                .article-b
                    text-align left
                    border 1px solid transparent
                    box-sizing border-box
                    padding 30px
                    padding-left 20px
                    .title
                        font-size $font-size-big
                        color $font-color
                        text-omit(1)
                        cursor pointer
                        transition color .3s
                        &:hover
                            color $active-color
                    .desc
                        font-size $font-size-small
                        color $font-color-minor
                        line-height 2em
                        text-omit(2)
                        margin 10px 0
                        padding-bottom 0
                        overflow hidden
                        text-overflow ellipsis
                        white-space: nowrap
                    .line
                        height 1px
                        width 100%
                        background-color $border-line-color
                        font-size 0
                        margin 15px 0
                    .entry-meta
                        .m-r-sm
                            margin-right 2px
                            &:after
                                content '·'
                                color: rgb(178, 186, 194)
                                margin-left 6px
                            &:last-child:after
                                content ''
                    .entry-meta
                        margin-top 0
                        color $font-color-minor
                        font-size $font-size-mini
            .more
                margin 5px 0
                display flex
                justify-content center
                align-items center
                width 100%
                box-shadow $box-shadow
                background $background-color
                border-radius 5px
                h3
                    margin 5px
            .none
                text-align center
                margin 30px 0
</style>

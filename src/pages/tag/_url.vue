<template>
  <div class="tag-content">
    <div class="title-list">
      <el-tooltip
        v-for="(tag) in tagList"
        :key="tag.name"
        effect="dark"
        placement="top"
      >
        <template v-slot:content>
          该标签下有 {{ tag.count }} 篇文章
        </template>
        <div class="tag-margin" :class="{active: tag.id===isActive}" @click="tagClick(tag.url, tag.id)">
          {{ tag.name }}
        </div>
      </el-tooltip>
    </div>
    <div v-if="total" class="article-wrapper">
      <transition-group name="flip-list">
        <article v-for="item in list" :key="item.id" class="article-con">
          <!--        <Blur />-->
          <router-link v-if="item.imageUrl" class="article-t" :to="{name:'article', params:{ url: item.url }}" tag="div">
            <div class="item-pic">
              <img v-lazy="item.imageUrl" alt="悠然小宋" />
            </div>
          </router-link>
          <div class="article-b">
            <nuxt-link class="title hover-active" :to="{name:'article-id', params:{ id: item.id }}" tag="h2">
              {{ item.title }}
            </nuxt-link>
            <el-tag
              v-for="(item, index) in item.tags"
              :key="index"
              class="tag-margin"
              size="mini"
              :disable-transitions="false"
              :color="item.color"
            >
              {{ item.name }}
            </el-tag>
            <div class="line" />
            <div class="entry-meta">
              <span class="m-r-sm">{{ formatToDate(item.createTime) }}</span>
              <span class="m-r-sm">{{ item.visits }}次围观</span>
              <span class="m-r-sm">{{ item.comments }}条评论</span>
            </div>
          </div>
        </article>
      </transition-group>
      <Pagination :total="total" :current-page="this.$route.query.page - 0" @currentChange="currentChange" />
    </div>
    <div v-else style="text-align:center;padding:40px 0">
      该标签下暂无文章~
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { formDate } from '@/utils'

export default {
  name: 'Tags',
  components: { Pagination },
  async asyncData ({ $axios, params, query }) {
    const { data } = await $axios.$get('/articles/tag')
    const tagList = data
    let url = null
    let isActive = 0
    if (params.url) {
      url = params.url
      isActive = params.id
    } else {
      url = tagList[0].url
      isActive = tagList[0].id
    }
    if (query.page) {
      const { data } = await $axios.$get(`articles/list?tagUrl=${url}&page=${query.page}`)
      return {
        list: data.list,
        total: data.total,
        isActive,
        tagList,
        url
      }
    } else {
      const { data } = await $axios.$get(`articles/list?tagUrl=${url}&page=1`)
      return {
        list: data.list,
        total: data.total,
        isActive,
        tagList,
        url
      }
    }
  },
  watchQuery: ['page'],
  data () {
    return {
      url: null
    }
  },
  methods: {
    currentChange (page) {
      this.$router.push({ name: 'tag-url', params: { url: this.url }, query: { page } })
    },
    tagClick (url, id) {
      this.$router.push({ name: 'tag-url', params: { url, id } })
    },
    formatToDate (v) {
      return formDate(v)
    }
  },
  head () {
    return {
      title: '标签-小宋博客',
      meta: [
        { hid: 'home', name: 'description', content: '小宋-个人博客' }
      ]
    }
  }
}
</script>

<style scoped lang="stylus">
@import "~assets/css/theme"
.tag-content
    overflow:hidden
    background-color $background-color
    width 100%
    padding 20px 20px
    box-sizing border-box
    box-shadow $box-shadow
    background $background-color
    border-radius 5px
    .title-list
        display flex
        flex-wrap wrap
        //justify-content start
        flex-direction: row
        .tag-margin
            box-sizing border-box
            box-shadow $box-shadow
            border-radius 5px
            background $background-color
            color $font-color
            cursor pointer
            transition all .3s ease-in-out
            &:hover
                color $background-color
                background-color $color
            padding 10px 15px
            margin: 5px 10px
        .active
            color $background-color
            background-color $active-color
    .article-wrapper
        margin-top 20px
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
            box-sizing border-box
            box-shadow $box-shadow
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
                    text-omit(1)
                .tag-margin
                    cursor pointer
                    color $background-color
                .desc
                    font-size $font-size-small
                    color $font-color-minor
                    line-height 2em
                    text-omit(2)
                    margin 10px 0
                    padding-bottom 0
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
</style>

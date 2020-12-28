<template>
  <div v-if="article" class="article-wrapper">
    <header class="blog-header">
      <h2 class="title">
        {{ article.title }}
      </h2>
      <div class="entry-meta">
        <span class="meta-date">
          <svg-icon name="time" />
          <span class="m-r-sm">{{ article.createTime | Date }}</span>
        </span>
        <span class="meta-views">
          <svg-icon name="eye" :style-obj="{ width: '1.5em', height: '1.5em' }" />
          <span class="m-r-sm">{{ article.visits }}次围观</span>
        </span>
        <span v-if="article.comments" class="meta-comments">
          <svg-icon name="comments" />
          <span class="m-r-sm">{{ count }}条评论</span>
        </span>
        <span v-if="article.cateName" class="meta-categories">
          <svg-icon name="category" />
          <span class="m-r-sm">{{ article.cateName }}</span>
        </span>
      </div>
    </header>
    <div class="blog-post">
      <article>
        <div v-if="article.imageUrl" class="entry-thumbnail">
          <el-image class="img" :src="article.imageUrl" />
        </div>
        <div class="post-content">
          <Marked v-if="article" :value="article.contentMd" />
        </div>
      </article>
      <div class="previous-next-links">
        <nuxt-link v-if="pre" class="button" :to="{name:'article-id', params:{id: pre.id }}">
          上一篇
          <span class="context">
            : {{ pre.title }}
          </span>
        </nuxt-link>
        <nuxt-link v-if="next" class="button" :to="{name:'article-id', params:{id: next.id }}">
          下一篇
          <span class="context">
            : {{ next.title }}
          </span>
        </nuxt-link>
      </div>
      <div class="copyright">
        本作品采用
        <a href="http://creativecommons.org/licenses/by-sa/4.0/" target="_blank">知识共享署名-相同方式共享 4.0 国际许可协议</a>
        进行许可
      </div>
    </div>
    <div class="show-foot">
      <div v-if="article.tags && article.tags.length" class="tags">
        <svg-icon name="tag" :style-obj="{ width: '1em', height: '1em' }" />
        <span v-for="tag in article.tags" :key="tag.name" class="tag">{{ tag.name }}</span>
      </div>
      <div v-if="article.updateTime !== 'Invalid date'" class="update">
        <svg-icon name="date" />
        <span class="notebook">最后修改: {{ article.updateTime | Date }}</span>
      </div>
    </div>
    <div v-if="article.isComment">
      <Comments :comments="comments" :count="count" :article-id="article.id" @submitComplete="handleComment" />
    </div>
  </div>
</template>

<script>
import Marked from '@/components/Markdown'
import Comments from '@/components/Comments'
import dayjs from 'dayjs'

export default {
  name: 'Article',
  scrollToTop: true, // 滚动到顶端
  components: { Marked, Comments },
  validate ({ params }) {
    return /^\d+$/.test(params.id)
  },
  filters: {
    /**
   * @return {string}
   */
    Date (time) {
      return dayjs(time).format('YYYY年MM月DD日')
    }
  },
  async fetch ({ store, params }) {
    await store.dispatch('article/getDetail', params.id)
  },
  async asyncData ({ params, $axios }) {
    // 获取评论
    const { data } = await $axios.$get(`comments/${params.id}`)
    return {
      comments: data.comments,
      count: data.count
    }
  },
  data () {
    return {
    }
  },
  computed: {
    article () {
      return this.$store.getters.article
    },
    pre () {
      return this.$store.getters.pre
    },
    next () {
      return this.$store.getters.next
    }
  },
  methods: {
    async handleComment () {
      const { data } = await this.$axios.$get(`comments/${this.$route.params.id}`)
      this.comments = data.comments
      this.count = data.count
      this.$router.go(0)
    }
  },
  head () {
    return {
      title: `${this.article.title}-小宋博客`,
      meta: [
        { hid: 'article', name: 'description', content: '小宋-个人博客' },
        { hid: 'classify', vmid: 'keywords', content: this.article.cateName },
        { hid: 'content', vmid: 'description', content: this.article.content.slice(0, 50) }
      ]
    }
  }
}
</script>

<style scoped lang="stylus">
    @import "~@/assets/css/theme"
    .article-wrapper
        width 100%
        padding 0 20px
        box-sizing border-box
        box-shadow $box-shadow
        background $background-color
        border-radius 5px
        .blog-header
            padding 20px 0
            text-align center
            .title
                font-size $font-size-title
                margin-bottom 5px
            .entry-meta
                padding-top 5px
                font-size $font-size-mini
                color $font-color-minor
                span
                    align-items center
                    svg
                        padding-right 5px
                    .m-r-sm
                        margin-right 10px
        .blog-post
            padding 0 30px
            .entry-thumbnail
                margin-bottom 10px
                .img
                    width 100%
                    background url("https://img.cdn.lsyblog.com/avatar-bg.jpg") no-repeat 50% 50%
                    border-radius 5px
            .copyright
                background-color rgba(220,220,220,.7)
                margin 25px 0 0
                padding 10px 15px
                text-align center
                font-size $font-size-small
                color $font-color-minor
                a
                    font-size $font-size-small
                    color $font-color-minor
                    transition color .3s
                    &:hover
                        color $active-color
            .previous-next-links
                margin-top 20px
                display flex
                justify-content center
                width 100%
                height 30px
                .button
                    text-decoration: none;
                    color: #409EFF;
                    border-radius 5px
                    cursor pointer
                    display flex
                    justify-content center
                    align-items center
                    margin 0 15px
                    width 40%
                    box-shadow $box-shadow
                    .context
                        align-items center

        .show-foot
            padding 10px 30px
            height 30px
            font-size $font-size-small
            color $font-color-minor
            .update
                float right
                svg
                    padding-right 3px
            .tags
                font-size $font-size-medium
                float left
                svg
                    margin-right 10px
                .tag
                    padding 3px 7px
                    font-size 12px
                    margin-right 5px
                    background-color #aaa
                    color $background-color
    @media (max-width: 768px)
        .blog-post
            padding 10px 0!important
            .button
                .context
                    display none
        .show-foot
            padding 5px 5px!important
            .update
                display none
        .copyright
            padding 5px 0!important

</style>

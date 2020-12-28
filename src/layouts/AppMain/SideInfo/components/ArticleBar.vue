<template>
  <div>
    <ul class="list-group">
      <nuxt-link v-for="item in list" :key="item.id" tag="li" :to="{ name: 'article-id', params: { id: item.id } }" class="list-group-item">
        <div class="article-img">
          <img v-lazy="item.imageUrl" alt="悠然小宋">
        </div>
        <div class="article-title">
          <h4 class="desc">
            {{ item.title }}
          </h4>
          <p class="info-bottom">
            <svg-icon name="date" :style-obj="{ width: '1.2em', height: '1.2em' }" />
            <span class="time">{{ item.createTime | formToDate }}</span>
            <svg-icon name="eye" :style-obj="{ width: '1.4em', height: '1.4em' }" />
            <span class="count">{{ item.visits }}</span>
          </p>
        </div>
      </nuxt-link>
    </ul>
  </div>
</template>

<script>
import { formDate } from '@/utils'

// const phoneWidth = 768

export default {
  name: 'ArticleBar',
  filters: {
    formToDate (v) {
      return formDate(v)
    }
  },
  props: {
    list: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      loading: true
    }
  }
}
</script>

<style scoped lang="stylus">
  @import "~@/assets/css/theme"
  .list-group
    margin 0
    padding-left 10px
    overflow hidden
  .list-group-item
    margin-bottom 10px
    max-height 60px
    display flex
    .article-title
      box-sizing border-box
      overflow hidden
      margin-left 10px
      font-size 14px
    .article-img
      flex 0 0 33%
      cursor pointer
      overflow hidden
      img
        height 100%
        width 100%
    .desc
      text-align left
      padding: 0
      margin: 0
      margin-bottom 2px
      color $font-color-minor
      cursor pointer
      white-space: nowrap
      overflow hidden
      text-overflow ellipsis
      transition all .3s ease-in-out
      &:hover
        color $active-color
        margin-left 5px
    .info-bottom
      display flex
      justify-content: flex-start
      align-items center
      margin 2px 0
      color $minor-color
      span
        padding 0 5px
</style>

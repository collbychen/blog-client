<template>
  <div class="comments-wrapper">
    <div class="comment-header">
      <span class="count">Comments | {{ count }} 条评论</span>
    </div>
    <Beep
      :article-id="articleId"
      :children-reply="false"
      @completeCom="done"
    />
    <div v-if="count">
      <ul :key="refreshKey" class="comment-list">
        <li v-for="(comment, index1) in commentList" :key="comment.id" class="comment">
          <div class="parent">
            <div class="profile">
              <img v-lazy="comment.avatar || 'https://cdn.coblog.cn/default_avatar.jpg'">
            </div>
            <div class="content">
              <div class="comment-info">
                <div v-if="comment.username" class="author">
                  <span v-if="comment.username === 'super_admin'" class="rank">博主</span>
                  <span>{{ comment.username }}</span>
                </div>
              </div>
              <!-- <Markdown :value="comment.content" class="mark-text" :style-obj="styleObj" /> -->
              <p>{{ comment.content }}</p>
              <div class="reply-stat">
                <span class="time">{{ comment.createTime | formToDate }}</span>
                <div class="action-box">
                  <span v-if="userID / 1 !== comment.userId / 1" class="reply" @click="handleReply(index1, { pid: comment.id, rid: comment.userId, toName: comment.username }, 0)"><svg-icon name="comment" /> 回复</span>
                </div>
              </div>
              <Beep
                v-if="visibleComment === index1"
                :to-user="toUser"
                :children-reply="true"
                :article-id="articleId"
                @completeCom="done"
              />
              <div v-if="comment.children && comment.children.length" class="sub-comment-list">
                <div v-for="(reply, index2) in comment.children" :key="reply.id" class="items">
                  <div class="item">
                    <div class="profile">
                      <img v-lazy="reply.avatar || 'https://cdn.coblog.cn/default_avatar.jpg'">
                    </div>
                    <div class="content">
                      <div class="comment-info">
                        <div v-if="reply.username" class="author">
                          <span v-if="reply.username === 'super_admin'" class="rank">博主</span>
                          <span>{{ reply.username }}</span>
                        </div>
                      </div>
                      <p class="mark-text">
                        <span style="color: #53a8ff;font-size: 12px">@{{ reply.replier }}:</span>
                        {{ reply.content }}
                      </p>
                      <!-- <Markdown :value="`回复<sapn style='color: #53a8ff;font-size: 12px'>@${reply.replier}: </sapn>${reply.content}`" :style-obj="styleObj" class="mark-text" />-->
                      <div class="reply-stat">
                        <span class="time">{{ reply.createTime | formToDate }}</span>
                        <div class="action-box">
                          <client-only>
                            <span v-if="userID / 1 !== reply.userId / 1" class="reply" @click="handleReply(index2, { pid: reply.parentId, rid: reply.replyId, toName: reply.replier }, 1)"><svg-icon name="comment" /> 回复</span>
                          </client-only>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Beep
                    v-if="visibleReply === index2"
                    :to-user="toUser"
                    :children-reply="true"
                    :article-id="articleId"
                    @completeCom="done"
                  />
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div v-else style="text-align: center; padding: 40px 0;">
      暂时没有评论哦,快来抢沙发٩(๑❛ᴗ❛๑)۶
    </div>
    <!--    <div v-if="!(total >= count)" style="padding: 0 0 30px;">-->
    <!--      <p id="more-load" v-loading="loading" @click="page++">-->
    <!--        加载更多评论-->
    <!--      </p>-->
    <!--    </div>-->
  </div>
</template>

<script>
import Beep from '@/components/Beep'
import { formDate } from '@/utils'

export default {
  name: 'Comments',
  components: { Beep },
  filters: {
    formToDate (v) {
      return formDate(v)
    }
  },
  props: {
    disabled: {
      type: Number,
      default: 0
    },
    comments: {
      type: Array,
      default () {
        return []
      }
    },
    articleId: {
      type: Number,
      required: true
    },
    count: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      textarea: '',
      visibleReply: -1,
      visibleComment: -1,
      refreshKey: 1, // 刷新
      toUser: {},
      // styleObj: {
      //   fontSize: '13px',
      //   padding: '3px 0 !important',
      //   color: '#505050'
      // },
      loading: false,
      commentList: this.comments,
      page: 1 // 默认页数
    }
  },
  computed: {
    avatar () {
      if (process.client) {
        return this.$store.getters.avatar
      }
      return ''
    },
    // total () {
    //   let num = this.commentList.length
    //   this.commentList.forEach((v) => {
    //     if (v.children) {
    //       num += v.children.length
    //     }
    //   })
    //   return num
    // },
    name () {
      if (process.client) {
        return this.$store.getters.name
      }
      return ''
    },
    userID () {
      if (process.client) {
        return this.$store.getters.userID
      }
      return ''
    }
  },
  // watch: {
  //   comments (newVal) {
  //     console.log('我有新的值了')
  //     this.commentList = newVal
  //   },
  //   async page (newVal) {
  //     this.loading = true
  //     const { data } = await this.$axios.$get(`comments/${this.articleId}`)
  //     // this.commentList.push(...result)
  //     this.commentList = data.comments
  //     this.loading = false
  //   }
  // },
  methods: {
    handleReply (i, v, type) {
      !type ? this.visibleComment = i : this.visibleReply = i
      this.toUser = v
      // this.cancelReply()
    },
    done () {
      // 完成回复收起评论框
      this.visibleReply = -1
      this.visibleComment = -1
      this.$emit('submitComplete')
    }
    // fight (obj) {
    //   this.textarea += `![鸡你太美](${obj.icon} "${obj.text}")`
    // }
  }
}
</script>

<style scoped lang="stylus">
  @import "~assets/css/theme"
  .comments-wrapper
    position relative
    #more-load
      font-size 14px
      text-align center
      background #7DB9DE
      width 100%
      color #fff
      padding 10px 15px
      box-sizing border-box
      margin 15px 0 0
      &:hover
        opacity 0.9
        cursor pointer
    .comment-header
      font-size 14px
      padding-bottom 10px
      height 20px
      .count
        float left
        font-size 13px
        padding-left 5px
        color $font-color-minor
      .login
        float right
    ul
      margin 0
      padding 0
    .comment-list
      padding 20px 0
      p
        margin 0
        padding 0
      .cancel
        position relative
        top -5px
        float right
        font-size $font-size-small
        color $active-color
        cursor pointer
        &:hover
          opacity .9
      .comment
        overflow hidden
        margin-bottom 15px
        &:last-child
          .content
            border 0
        .sub-comment-list
          margin 10px 0
          padding 10px 10px 0
          background #FBFBFB
          .items
            margin-bottom 10px
            &:last-child
              margin-bottom 0
              .content
                border 0
          .item
            margin-bottom 10px
            display flex
            .reply-content
              flex 1 1 auto
      .parent
        display flex
        .profile
          height 40px
          margin 5px
          img
            height @height
            border-radius 50%
            transition all .6s
            &:hover
              transform rotateZ(360deg)
        .comment-info
          .author
            display inline-block
            font-size 12px
            color #1abc9c
            line-height 2em
            .rank
              position: relative
              top -2px
              padding 1px 0
              display inline-block
              text-align center
              color $color-lightPink
              font-size 12px
              font-weight 400
              border-radius 3px
              min-width 30px
              border 1px solid rgba(255,174,173,.3)
              margin-right 3px
              line-height 1em
          .info
            position relative
            display inline-block
            margin-left 10px
            color $font-color-minor
            font-size $font-size-mini
            .useragent-info
              padding 5px
              background #EDEDED
              border-radius 5px
              color #b3b1b1
      .content
        flex 1 1 auto
        margin 0 10px
        font-size $font-size-small
        border-bottom 1px solid #EEEEEE
        padding-bottom 8px
        .v-note-wrapper
          margin-top 0!important
        .reply-stat
          margin 8px 0
          color #8a9aa9
          font-size 12px
          display flex
          .action-box
            display inline-block
            margin-left auto
            cursor pointer
            .reply
              padding-left 20px
              cursor pointer
  @media (max-width: 768px)
    .comments-wrapper
      .info-mark
        display none
      .el-textarea
        width 80%!important
        float: right!important
      .comment-bottom
        width 100%!important
      .comment-list
        padding-top 10px!important
</style>

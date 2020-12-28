<template>
  <div class="beep">
    <el-input
      v-model="textarea"
      type="textarea"
      placeholder="请输入内容..."
      maxlength="400"
      resize="none"
      rows="5"
      show-word-limit
    />
    <div class="comment-bottom clearfix">
      <p class="submit">
        <el-button type="primary" size="medium" @click="submitForm()">
          提交评论
        </el-button>
      </p>
    </div>
  </div>

</template>

<script>
export default {
  name: 'Beep',
  components: { },
  props: {
    articleId: {
      type: Number,
      required: true
    },
    toUser: {
      type: Object,
      default () {
        return {}
      }
    },
    childrenReply: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      textarea: ''
    }
  },
  methods: {
    submitForm () {
      if (this.textarea) {
        if (this.$parent.userID) {
          this.postComment()
        } else {
          this.$message.warning('请您先登录!')
        }
        return
      }
      this.$message.warning('你就没什么想说的吗(╥╯^╰╥)')
    },
    async postComment () {
      let comment = {
        content: this.textarea,
        articleId: this.articleId,
        avatar: this.$parent.avatar,
        username: this.$parent.name,
        userId: this.$parent.userID,
        createTime: Date.now(),
        targetType: 1
      }
      // 是否子父级评论
      if (this.childrenReply) {
        comment.targetType = 2
        comment = Object.assign({ parentId: this.toUser.pid, replyId: this.toUser.rid, replier: this.toUser.toName }, comment)
        await this.$axios.post('comments', comment)
      } else {
        await this.$axios.post('comments', comment)
      }
      this.textarea = ''
      this.$message.success('发表成功！')
      this.done()
    },
    done () {
      this.$emit('completeCom')
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "~@/assets/css/theme"
  .user-info
    margin-top 20px
    display flex
    justify-content space-between
  .comment-bottom
    width 100%
    clear both
    padding-bottom 5px
    position: relative
  .el-form-item
    margin-bottom 0
  .submit
    float right
    margin-top 15px
  .info-mark
    font-size $font-size-small
    color $active-color
    position: absolute
    top 25px
    right 120px
    bottom 20px
    .icon-svg
      padding-right 3px
  .el-button--primary
    background-color $active-color
    border-color $active-color
    &:hover
      color #fff
      opacity .9

  @media (max-width: 768px)
    .user-info
      flex-wrap wrap!important
      .el-form-item
        flex 0 0 100%
        margin-bottom 10px
        &:last-child
          margin-bottom 0
</style>

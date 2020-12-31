<template>
  <div>
    <el-dropdown class="user" trigger="click" @command="login">
      <div class="warp el-dropdown-link">
        <img v-lazy="avatar" :class="avatar? 'user-avatar' : 'no_pic'">
        <span v-if="name">{{ name }}</span>
        <span v-else>登录</span>
        <i class="el-icon-arrow-down el-icon--right" />
      </div>
      <el-dropdown-menu v-if="!name" slot="dropdown">
        <el-dropdown-item :command="0">
          Github
        </el-dropdown-item>
      </el-dropdown-menu>
      <el-dropdown-menu v-else slot="dropdown">
        <el-dropdown-item command="logout">
          注销
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  name: 'Login',
  computed: {
    name () {
      return this.$store.getters.name
    },
    userID () {
      return this.$store.getters.userID
    }
  },
  methods: {
    login (type) {
      if (type === 0) {
        this.$store.dispatch('user/loginGithub')
      } else if (type === 'logout') {
        // 登出
        this.$store.dispatch('user/logout')
      }
    }
  }
}
</script>

<style scoped lang="stylus">
  @import "~assets/css/theme"
  .el-dropdown-link
    display flex
    justify-content center
    flex-direction row
    align-items center
    color $active-color
    cursor pointer
    .user-avatar
      width 25px
      margin 5px
      border-radius 50%
      overflow hidden
    .no_pic
        display none
  @media (max-width: 768px)
    .user-avatar
      display none
</style>

<template>
  <div class="site-user">
    <div class="not-login">
      <Login />
    </div>
  </div>
</template>

<script>
import Login from '@/components/Login'
export default {
  name: 'User',
  components: { Login },
  methods: {
  }
}
</script>

<style scoped lang="stylus">
@import "~@/assets/css/theme"
.site-user
    display flex
    .not-login
        margin auto 10px
</style>

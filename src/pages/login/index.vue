<template>
	<div class="login">
		登陆成功{{ Sencond }}秒后关闭页面
	</div>
</template>

<script>
// 这是一个空页面，专门用来处理github登录成功回调 访问路径为 /github
export default {
	data () {
		return {
			Sencond: 5
		}
	},
	mounted () {
		this.init()
	},
	methods: {
		init () {
			const code = this.$route.query.code
			this.$store.dispatch('user/loginGithub', code)
			const that = this
			const interval = window.setInterval(function () {
				--that.Sencond
				if (that.Sencond === 0) {
					window.clearInterval(interval)
					that.$router.push({ path: '/' })
				}
			}, 1000)
		}
	}
}
</script>

<style scoped lang="stylus">
@import "~assets/css/theme"
.login
	position: fixed
	left: 0
	top: 0
	width: 100vw
	height: 100vh
	z-index: 999
	background: $background-color
</style>

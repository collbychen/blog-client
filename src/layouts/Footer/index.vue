<template>
    <footer class="footer">
        <p>博客已萌萌哒运行 {{ activeTime }}<span class="move">(ﾟωﾟ)ﾉ☆</span></p>
        <p>托管于腾讯云 | 使用七牛云 镜像存储</p>
        <p>COPYRIGHT 2020 小宋个人博客. 粤ICP备2020101050号.</p>
    </footer>
</template>

<script>
import { padLocation } from '@/utils'

export default {
    name: 'CoFooter',
    data () {
        return {
            startTime: '2020-01-01 08:00:00',
            activeTime: '正在加载...'
        }
    },
    created () {
        this.getRunTime()
    },
    methods: {
        getRunTime () {
            setInterval(() => {
                const date = parseInt(new Date() - new Date(this.startTime))
                // 天数
                const day = Math.floor(date / 1000 / 60 / 60 / 24)
                // 小时
                const hour = Math.floor(date / 1000 / 60 / 60 % 24)
                // 分钟
                const minute = Math.floor(date / 1000 / 60 % 60)
                // 秒
                const second = Math.floor(date / 1000 % 60)
                this.activeTime = `${day}天${padLocation(hour)}小时${padLocation(minute)}分${padLocation(second)}秒`
            }, 1000)
        }
    }
}
</script>

<style scoped lang="stylus">
@import "~assets/css/theme"
.footer
    background-color #232323
    width 100%
    height 85px
    box-sizing border-box
    padding 15px 10px
    text-align center
    font-size $font-size-mini
    color $font-color-minor
    line-height 1.5em
    p
        margin 0
    .move
        display inline-block
        animation pulse 1s infinite
@keyframes pulse
    0% {
        transform translateY(0) rotate(0)
    }
    50% {
        transform translateY(3px) rotate(-3deg)
    }
    70% {
        transform translateY(0) rotate(-3deg)
    }
    100% {
        transform translateY(0) rotate(0)
    }
</style>

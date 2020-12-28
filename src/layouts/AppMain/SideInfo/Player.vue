<template>
  <div class="player">
    <div class="disk">
      <div class="cover" :class="{disk_play:start}">
        <img
          ref="disk"
          :src="playList[currentIndex].img"
          alt
          width="100"
          height="100"
          class="playImg"
          :style="{transform:matrix}"
          @click="showMusic"
        >
      </div>
    </div>
    <div class="control">
      <div class="face">
        <div class="pre button_control" @click="preSong" />
        <div class="button_control" :class="!start?'start':'stop'" @click="switchBtn()" />
        <div class="next button_control" @click="nextSong" />
      </div>
    </div>
    <div class="progress">
      <div class="progress_warp" :class="{ progress_playing: start }">
        <div class="progress_title">
          <div class="name desc">
            {{ playList[currentIndex].name }}
          </div>
          <div class="author desc">
            {{ playList[currentIndex].author }}
          </div>
        </div>
        <div class="progress_text">
          {{ nowTime | formatTime }} / {{ duration | formatTime }}
        </div>
        <div ref="bar" class="progress_line">
          <div :style="{width:nowTime*(100/duration1)+'%'}" class="currentTime" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Player',
  components: {},
  filters: {
    formatTime (val) {
      const min = Math.floor(val / 60)
      const sec = Math.floor(val % 60)
      return `${min}:${sec < 10 ? '0' : ''}${sec}`
    }
  },
  data () {
    return {
      matrix: '',
      nowDeg: 0,
      audio: null,
      songLink: null,
      start: false,
      duration: 0,
      duration1: 0,
      nowTime: 0,
      currentIndex: 0,
      playList: [
        {
          name: 'Light A Fire',
          author: 'Alisa',
          img: 'https://cdn.coblog.cn/Angela_.jpg',
          url: 'https://cdn.coblog.cn/light_a_fire.mp3'
        },
        {
          name: 'Ref:rain',
          author: 'Aimer',
          img: 'https://cdn.coblog.cn/恋如雨止.jpg',
          url: 'https://cdn.coblog.cn/refrain.mp3'
        },
        {
          name: 'My Dearest',
          author: 'SuperCell',
          img: 'https://cdn.coblog.cn/祈妹.jpg',
          url: 'https://cdn.coblog.cn/my_dearest.mp3'
        },
        {
          name: 'Distance',
          author: '村川梨衣',
          img: 'https://cdn.coblog.cn/黑社会的超能力女儿.jpg',
          url: 'https://cdn.coblog.cn/distance.mp3'
        },
        {
          name: 'Remember Me',
          author: 'Miguel/Natalia Lafourcade',
          img: 'https://cdn.coblog.cn/CoCo.jpg',
          url: 'https://cdn.coblog.cn/remember_me.mp3'
        },
        {
          name: 'Kiss Me',
          author: 'Nai Br.XX、Celeina Ann',
          img: 'https://cdn.coblog.cn/Carole&Tuesday.jpg',
          url: 'https://cdn.coblog.cn/kiss_me.mp3'
        }
      ]
    }
  },
  mounted () {
    this.audio = new Audio()
    this.audio.src = this.playList[0].url
    const timer = setInterval(() => {
      if (!isNaN(this.audio.duration)) {
        this.duration = this.audio.duration
        this.duration1 = this.audio.duration
        clearInterval(timer)
      }
    }, 100)

    this.audio.addEventListener('timeupdate', () => {
      this.nowTime = this.audio.currentTime
      if (this.nowTime === this.duration1) {
        this.nextSong()
      }
    })
    this.$refs.bar.addEventListener('click', (e) => {
      setTimeout(() => {
        this.nowTime = (e.offsetX / 180) * this.duration1
        this.audio.currentTime = this.nowTime
      }, 100)
    })
  },
  methods: {
    showMusic () {
      this.hiddenMusic = !this.hiddenMusic
    },
    switchBtn () {
      this.start = !this.start
      if (this.start === true) {
        this.duration = this.audio.duration
        this.duration1 = this.audio.duration
        if (this.nowTime !== 0) {
          this.audio.currentTime = this.nowTime
        }
        this.audio
          .play()
          .then((res) => { return res })
          .catch((err) => { return err })
      } else {
        this.stopRotate()
        this.audio.pause()
        this.audio.currentTime = this.nowTime
      }
    },
    // 切歌
    changeSong (index) {
      this.matrix = ''
      this.start = false
      setTimeout(() => {
        this.start = true
        const styles = [...document.styleSheets]
        styles.forEach((style) => {
          const rules = [...style.cssRules]
          rules.forEach((rule) => {
            if (rule.type === rule.KEYFRAMES_RULE && rule.name === 'rotate1') {
              rule.cssRules[0].style.transform = 'rotate(0deg)'
              rule.cssRules[1].style.transform = 'rotate(360deg)'
            }
          })
        })
        this.audio.src = this.playList[index].url
        const timer = setInterval(() => {
          if (!isNaN(this.audio.duration)) {
            this.duration = this.audio.duration
            this.duration1 = this.audio.duration
            clearInterval(timer)
          }
        }, 100)
        this.audio
          .play()
          .then((res) => { return res })
          .catch((err) => { return err })
      }, 500)
    },
    preSong () {
      if (this.currentIndex === 0) {
        this.currentIndex = this.playList.length - 1
      } else {
        this.currentIndex--
      }
      this.audio.pause()
      if (this.start === false) {
        this.start = !this.start
      }
      this.changeSong(this.currentIndex)
    },
    nextSong () {
      if (this.currentIndex < this.playList.length - 1) {
        this.currentIndex++
      } else {
        this.currentIndex = 0
      }
      this.changeSong(this.currentIndex)
    },
    // 停止转盘转动
    stopRotate () {
      const currentMatrix = window.getComputedStyle(this.$refs.disk).transform

      function getMatrix (a, b, c, d) {
        const aa = Math.round((180 * Math.asin(a)) / Math.PI)
        const bb = Math.round((180 * Math.acos(b)) / Math.PI)
        const cc = Math.round((180 * Math.asin(c)) / Math.PI)
        const dd = Math.round((180 * Math.acos(d)) / Math.PI)
        let deg = 0
        if (aa === bb || -aa === bb) {
          deg = dd
        } else if (-aa + bb === 180) {
          deg = 180 + cc
        } else if (aa + bb === 180) {
          deg = 360 - cc || 360 - dd
        }
        return deg >= 360 ? 0 : deg
        // return (aa+','+bb+','+cc+','+dd);
      }

      this.matrix = currentMatrix
      const res = currentMatrix
        .split('(')[1]
        .split(')')[0]
        .split(',')
      const rotateDeg = getMatrix(res[0], res[1], res[2], res[3], res[4], res[5])
      this.nowDeg = rotateDeg
      const styles = [...document.styleSheets]
      styles.forEach((style) => {
        const rules = [...style.cssRules]
        rules.forEach((rule) => {
          if (rule.type === rule.KEYFRAMES_RULE && rule.name === 'rotate1') {
            rule.cssRules[0].style.transform = `rotate(${rotateDeg}deg)`
            rule.cssRules[1].style.transform = `rotate(${rotateDeg + 360}deg)`
          }
        })
      })
    }
  }
}
</script>

<style scoped lang="stylus">
    @import "~@/assets/css/theme"
    .player
        position relative
        margin-top 75px
        display flex
        height 80px
        border-radius 10px
        background-color $background-color
        box-shadow $box-shadow
        .disk
            flex 1.2
            padding 6px
            .disk_play
                .playImg
                    animation rotate1 6s infinite linear
            @keyframes rotate1
                from
                    transform: rotate(0)
                to
                    transform: rotate(360deg)
            .cover
                position relative
                width 100px
                height 100px
                top -50px
                left 15%
                transition all 0.3s linear
                border-radius 100%
                &:after
                    content ''
                    position absolute
                    top 50%
                    left 50%
                    margin-left -8px
                    margin-top -8px
                    width 16px
                    height 16px
                    border-radius 100%
                    background-image linear-gradient(45deg, white, #dabad1)
                    box-shadow 0 1px 1px 1px rgba(0, 0, 0, 0.2)
                .playImg
                    position relative
                    background-color black
                    cursor pointer
                    box-shadow: 0 10px 10px -4px rgba(122, 103, 103, 0.8);
                    border-radius: 50%
        .control
            flex 2
            padding 12px
            .face
                display flex
                height 100%
                .button_control
                    margin 2px
                    align-items center
                    justify-content center
                    flex 1
                    border-radius 5px
                    transition background-color 0.6s ease
                    &:hover
                        cursor pointer
                        background-color $font-color
                .pre
                    position relative
                    &:before
                        content ""
                        position absolute
                        top 50%
                        left 30%
                        width 0
                        height 0
                        transform translate(-50%, -50%)
                        border-style solid
                        border-width 10px
                        border-color transparent #d9d9d9 transparent transparent
                    &:after
                        content ""
                        width 0
                        height 0
                        position absolute
                        top 50%
                        left 50%
                        transform: translate(-50%, -50%)
                        border-style solid
                        border-width 10px
                        border-color transparent #d9d9d9 transparent transparent
                .next
                    position relative
                    &:before
                        content ""
                        width 0
                        height 0
                        position absolute
                        transform translate(-50%, -50%)
                        top 50%
                        right 10%
                        border-style solid
                        border-width 10px
                        border-color transparent transparent transparent #d9d9d9
                    &:after
                        content ""
                        width 0
                        height 0
                        position absolute
                        transform translate(-50%, -50%)
                        top 50%
                        right -10%
                        border-style solid
                        border-width 10px
                        border-color transparent transparent transparent #d9d9d9
                .stop
                    position relative
                    &:before
                        content ""
                        width 6px
                        height 30px
                        left 35%
                        top 20%
                        background-color #d9d9d9
                        position absolute
                    &:after
                        content: ""
                        width 6px
                        height 30px
                        left 55%
                        top 20%
                        background-color #d9d9d9
                        position absolute
                .start
                    position relative
                    &:before
                        border-color transparent transparent transparent #d9d9d9
                    &:after
                        content ""
                        width 0
                        height 0
                        top 20%
                        left 35%
                        position absolute
                        border-style solid
                        border-width 15px
                        border-color transparent transparent transparent #d9d9d9
        .progress
            position absolute
            left 10px
            right 10px
            top 0
            bottom 15px
            z-index -1
            .progress_warp
                display flex
                flex-direction: column
                padding-left 120px
                padding-right 15px
                height 90%
                border-radius 10px 10px 0 0
                transition all 0.6s ease
                background-color rgba(0,0,0,0.08)
                .progress_title
                    overflow hidden
                    .name
                        padding-top 3px
                        font-size 12px
                    .author
                        transform scale(0.8)
                        transform-origin left top
                    .desc
                        margin 0
                        color $font-color-minor
                        text-overflow ellipsis
                        overflow hidden
                        text-align left
                        white-space: nowrap
                .progress_text
                    text-align left
                    height 10px
                    font-size 10px
                    margin 0
                    font-weight: bold
                    color $font-color-minor
                    transform scale(0.7)
                    transform-origin left top
                .progress_line
                    margin-top 3px
                    height 6px
                    border-radius 5px
                    overflow hidden
                    background-color $minor-color
                    &:hover
                        cursor pointer
                    .currentTime
                        height 6px
                        background-color $active-color
                        border-radius 10px
                        transition all 0.2s linear
            .progress_playing
                transform translateY(-100%)
</style>

<template>
  <div class="about-wrapper">
    <main class="content">
      <header class="title">
        <h2>About</h2>
      </header>
      <hr class="parting-line">
      <div class="site">
        <div class="info">
          <h2 class="info-title">
            关于我
          </h2>
          <p>喜欢计算机有关的事物,喜欢DIY主机,桌面美化，软件和网页开发等，同时也喜欢3A大作游戏。</p>
          <p>目前主要在学java，本站后台也是用java做的,其他语言稍有涉足,偶尔打打游戏,目前在朝着全栈攻城狮努力着.</p>
        </div>
        <div class="technology">
          <h2 class="technology-title">
            关于本站
          </h2>
          <p>
            基于SpringBoot搭建的开源个人博客系统,主题基于Hexo主题 <a href="https://github.com/ZEROKISEKI/hexo-theme-gal">hexo-theme-gal</a> 和Jade主题 <a href="https://github.com/da34/vue-blog-client">vue-blog-client</a> 进行修改。
            一直想着自己有个人的博客，和共同爱好的朋友学习和分享关于电脑的知识，由此本博客就诞生了!
          </p>
          <h2 class="mini-title">
            技术栈
          </h2>
          <ul>
            <li>
              <h2 class="front">
                client:
              </h2>
              <span>
                <s>Vue +</s>
                <s>Vue-Router +</s>
                NuxtJs +
                Vuex +
                Element Ui
              </span>
            </li>
            <li>
              <h2 class="front">
                admin:
              </h2>
              <span>
                Vue + Vue-Router + Vuex + Element Ui
              </span>
            </li>
            <li>
              <h2 class="front">
                serve:
              </h2>
              <span>
                SpringBoot + SpringSecurity + MyBatis + MySQL + Docker + Maven
              </span>
            </li>
          </ul>
        </div>
        <div class="relation">
          <h2 class="title" style="text-align: left;">
            联系方式
          </h2>
          <ul>
            <li>
              <h2 class="front">
                QQ:
              </h2><span>376010115</span>
            </li>
            <li>
              <h2 class="front">
                邮箱:
              </h2><span>376010115@qq.com</span>
            </li>
            <li>
              <h2 class="front">
                新浪微博:
              </h2><span><a href="https://weibo.com/u/1980664530" target="_blank">https://weibo.com/u/1980664530</a></span>
            </li>
          </ul>
        </div>
        <div class="history">
          <h2 class="history-title">
            本站发展历史
          </h2>
          <div class="block">
            <el-timeline>
              <el-timeline-item
                v-for="(activity, index) in activities"
                :key="index"
                :color="activity.color"
                :timestamp="activity.timestamp"
              >
                {{ activity.content }}
              </el-timeline-item>
            </el-timeline>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'About',
  layout: 'blog',
  head () {
    return {
      title: '关于- 小宋博客',
      meta: [
        { hid: 'home', name: 'description', content: '小宋-个人博客' }
      ]
    }
  },
  data () {
    return {
      activities: [
        {
          content: '第一次尝试写博客并上线',
          timestamp: '2020-05-1',
          color: '#53A8FF'
        }, {
          content: '重写前端ui和服务端,后台改用vue-element-admin。',
          timestamp: '2020-06-13',
          color: '#FFA7A6'
        },
        {
          content: '改成ssr利于seo，使用nuxt框架',
          timestamp: '2020-09-20',
          color: '#f9d5c7'
        },
        {
          content: '后台管理系统更新，前台支持github登录',
          timestamp: '2020-11-10',
          color: '#f9f5c7'
        }
      ]
    }
  }
  // mounted () {
  //   // setTimeout(_ => {
  //   //   this.$store.dispatch('bus/HTML_Height')
  //   // }, 1000)
  // },
  // activated () {
  //   // setTimeout(_ => {
  //   //   this.$store.dispatch('bus/HTML_Height')
  //   // }, 1000)
  // }
}
</script>

<style scoped lang="stylus">
@import "~@/assets/css/theme"
  .about-wrapper
    padding 30px
    background-color $background-color
    box-sizing border-box
    line-height 2
    @media (max-width 768px)
      width 100%
      padding 10px
      .title
        font-size 18px!important
    .content
      padding 0 20px
      .title
        font-size 22px
        text-align center
      #YuJie
        font-size 18px
      .site
        .front
          display inline-block
          font-size 18px
          font-weight 700
          margin-right 20px
        .info
          .info-title
            font-size 26px
        .technology
          margin-top 30px
          .technology-title
            font-size 26px
          a
            color: $minor-color
            font-size $font-size-small
            text-decoration none
            &:hover
              color $active-color
          .mini-title
            font-size $font-size-title
        .relation
          a
            color: $minor-color
            text-decoration none
            font-size $font-size-small
            &:hover
              color $active-color
        .history
          margin 30px auto 0
          .history-title
            font-size 26px
            margin-bottom 15px
        .info, .technology, .relation
          ul
            padding-left 30px
            li
              list-style disc
</style>

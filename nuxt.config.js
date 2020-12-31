const path = require('path')
/* eslint-disable */
const resolve = (dir) => {
  return path.join(__dirname, dir)
}

export default {
  mode: 'universal',
  srcDir: 'src/',
  head: {
    title: 'coblog_client',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: 'https://cdn.coblog.cn/favicon.ico' }
    ]
  },
  router: {
    scrollBehavior: (to, from, savedPosition) => {
      return { x: 0, y: 0 }
    },
    linkActiveClass: 'active-nav'
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#409EFF' },
  /*
  ** Global CSS
  */
  css: [
    'element-ui/lib/theme-chalk/index.css',
    '@/assets/css/index.styl'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/element-ui',
    '@/plugins/axios',
    { src: '@/plugins/svg-icon', ssr: true },
    { src: '@/plugins/vue-lazyload', ssr: false },
    { src: '@/plugins/localStorage', ssr: false }
  ],
  // Auto import components
  components: true,
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // '@nuxtjs/eslint-module'
    '@nuxtjs/style-resources'
  ],
  modules: [
    '@nuxtjs/axios',
  ],
  server: {
    port: 3000
  },
  axios: {
    proxy: true,
    prefix: '/api', // baseURL
    credentials: true
  },
  proxy: {
    '/api': {
      // target: 'https://wwww.coblog.cn:8080',
      target: 'http://localhost:8080',
      changeOrigin: true,
      pathRewrite: {
        '^/api': ''
      }
    }
  },
  build: {
    // transpile: [/^element-ui/],
    // vendor: ['axios']
    extend (config, context) {
      // 排除 nuxt 原配置的影响,Nuxt 默认有vue-loader,会处理svg,img等
      // 找到匹配.svg的规则,然后将存放svg文件的目录排除
      const svgRule = config.module.rules.find(rule => rule.test.test('.svg'))
      svgRule.exclude = [path.resolve(__dirname, 'src/assets/icons')]

      // 添加loader规则
      config.module.rules.push({
        test: /\.svg$/, // 匹配.svg
        include: [path.resolve(__dirname, 'src/assets/icons')], // 将存放svg的目录加入到loader处理目录
        use: [{
          loader: 'svg-sprite-loader',
          options: { symbolId: 'icon-[name]' }
        }]
      })
    }
  }
}

import VueLazyload from 'vue-lazyload'
import Vue from 'vue'

// 图片懒加载
Vue.use(VueLazyload, {
  preLoad: 1,
  error: require('../assets/images/nopic.jpg'),
  loading: require('../assets/images/loading.gif'),
  attempt: 2
})

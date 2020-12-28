import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'// svg组件

// 全局注册SvgIcon组件
Vue.component('svg-icon', SvgIcon)

// 获取全部的svg图标，其他页面不需要单独引入svg图标
const req = require.context('@/assets/icons/svg', false, /\.svg$/)
// 获得的req 为webpackContext
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)

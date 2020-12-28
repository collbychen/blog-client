import { Message } from 'element-ui'

// const debug = process.env.NODE_ENV !== 'production'
export default function ({ $axios, redirect }) {
  // 基本配置
  $axios.defaults.timeout = 10000
  // $axios.defaults.baseURL = 'http://127.0.0.1:8080'

  // console.log($axios.defaults)

  // 成功的回调
  $axios.onRequest((config) => {
    // 请求之前判断有无token
    // const token = getToken()
    // if (token) {
    //   $axios.setToken(token, 'Bearer')
    // }
    // console.log('请求中')
  })
  // response 拦截器
  $axios.interceptors.response.use(
    (response) => {
      const res = response.data.code
      if (res === 0) {
        redirect('/error')
      }
      return response
    }
  )
  // 错误的回调
  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      Message.error(error.message)
      redirect('/error')
    }
  })
}

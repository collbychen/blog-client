
// 在这个自定义插件中配置 vuex-persistedstate
import createPersistedState from 'vuex-persistedstate'
import Cookies from 'js-cookie'

// 这里什么都可以写, 不过如果你需要用到 nuxt 本身, 必须通过 export 的方式暴露函数来接收
const cookieStorage = {
  getItem (key) {
    return Cookies.getJSON(key)
  },
  setItem (key, value) {
    const inFifteenMinutes = new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000)
    return Cookies.set(key, value, {
      expires: inFifteenMinutes,
      secure: false
    })
  },
  removeItem (key) {
    return Cookies.remove(key)
  }
}
export default (context) => {
  // 如果想要等到 nuxt 加载完毕
  // 再执行代码, 有一个函数叫做 window.onNuxtReady()
  window.onNuxtReady(() => {
    createPersistedState({
      reducer (obj) {
        // 其中 username authority 为需要自动存储的 state
        const { user } = obj
        return { user }
      },
      storage: cookieStorage,
      getState: cookieStorage.getItem,
      setState: cookieStorage.setItem
    })(context.store)
  })
}

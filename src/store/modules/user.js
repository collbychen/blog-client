// import { setToken, getToken, removeToken } from '@/utils/auth'
const state = () => ({
  token: '',
  name: '',
  avatar: '',
  id: ''
})

const mutations = {
  SET_NAME: (state, str) => {
    state.name = str
  },
  SET_AVATAR: (state, str) => {
    state.avatar = str
  },
  SET_ID: (state, id) => {
    state.id = id
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  }
}
const actions = {
  loginGithub ({ commit, dispatch }) {
    return new Promise((resolve, reject) => {
      this.$axios.get('/app/github').then((resp) => {
        const width = 900
        const height = 540
        const left = (window.screen.width - width) / 2
        const top = (window.screen.height - height) / 2
        window.open(resp.data.data, '_blank',
          'toolbar=yes, location=yes, directories=no, status=no, menubar=yes, scrollbars=yes, resizable=no, copyhistory=yes, left=' +
          left + ', top=' + top + ', width=' + width + ', height=' + height)
        // 监听登录窗口是否关闭,登录成功后 后端返回关闭窗口的代码
        window.addEventListener('message', (e) => {
          // commit('SET_TOKEN', e.data)
          // setToken(e.data)
          if (e.data) {
            // 处理登录逻辑
            setTimeout(() => {
              commit('SET_TOKEN', e.data)
              // setToken(e.data)
              dispatch('saveInfo', e.data)
              resolve()
            }, 200)
          }
        })
      }).catch((fail) => {
        reject(fail)
      })
    })
  },
  logout ({ commit, dispatch }) {
    return new Promise((resolve, reject) => {
      // 置空用户相关的信息
      commit('SET_TOKEN', '')
      dispatch('removeInfo')
      // removeToken()
      // this.$router.go(0)
      resolve()
    })
  },
  saveInfo ({ commit }, token) {
    return new Promise((resolve, reject) => {
      this.$axios.$get('app/userInfo', { params: { token } }).then((res) => {
        if (res.data) {
          // console.log('写入')
          commit('SET_NAME', res.data.name)
          commit('SET_AVATAR', res.data.avatar)
          commit('SET_ID', res.data.id)
        }
        resolve()
      }).catch((error) => {
        reject(error)
      })
    })
  },
  removeInfo ({ commit }) {
    // console.log('清除')
    commit('SET_NAME', '')
    commit('SET_AVATAR', '')
    commit('SET_ID', '')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

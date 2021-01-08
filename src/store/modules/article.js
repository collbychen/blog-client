// import el from "element-ui/src/locale/lang/el";

const state = () => ({
  archiveList: [],
  count: 0,
  list: [],
  total: 0,
  hotList: [],
  article: {},
  pre: {},
  next: {}
})

const mutations = {
  setData (state, payload) {
    state[payload.key] = payload.value
  },
  setArticles (state, { data, count }) {
    state.list = data
    state.total = count
  },
  setArchive (state, { data, count }) {
    state.archiveList = data
    state.count = count
  }
}

const actions = {

  // 获取文章列表
  // async getList ({ commit }, query) {
  //   const { data } = await this.$axios.$get(`articles/list?categoryUrl=${query.url}&page=${query.page}`)
  //   if (data === null) {
  //     commit('setArticles', { data: [], count: 0 })
  //   } else {
  //     commit('setArticles', { data: data.list, count: data.total })
  //   }
  // },

  // 获取归档列表
  async getArchiveList ({ commit }) {
    const { data } = await this.$axios.$get('articles/archiveList')
    commit('setArchive', { data: data.list, count: data.count })
  },

  // 获取热门文章
  async getHotList ({ commit }) {
    const { data } = await this.$axios.$get('articles/hot')
    commit('setData', { key: 'hotList', value: data })
  },

  // 获取文章详情
  async getDetail ({ commit }, id) {
    const { data } = await this.$axios.$get(`articles/${id}`)
    commit('setData', { key: 'article', value: data.info })
    commit('setData', { key: 'pre', value: data.pre })
    commit('setData', { key: 'next', value: data.next })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

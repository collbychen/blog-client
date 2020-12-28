
const state = () => ({
  list: []
})

const mutations = {
  setCategoryList (state, data) {
    state.list = data
  }
}

const actions = {
  async getList ({ commit }) {
    const { data } = await this.$axios.$get('/articles/category')
    commit('setCategoryList', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

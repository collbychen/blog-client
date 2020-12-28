
const state = () => ({
  global: null,
  url: ''
})

const mutations = {
  SET_GLOBAL: (state, global) => {
    state.global = global
  }
}

const actions = {
  async getGlobal ({ commit }) {
    const { data } = await this.$axios.$get('app/global')
    commit('SET_GLOBAL', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

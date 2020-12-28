import article from './modules/article'
import category from './modules/category'
import tag from './modules/tag'
import app from './modules/app'
import user from './modules/user'
import getters from './getters'

const store = {
  modules: {
    article,
    tag,
    category,
    app,
    user
  },
  getters,
  actions: {
    async nuxtServerInit ({ dispatch }) {
      await dispatch('app/getGlobal')
      await dispatch('article/getHotList')
      await dispatch('tag/getList')
      await dispatch('category/getList')
    }
  }
}

export default store

const getters = {
  name: state => state.user.name,
  avatar: state => state.user.avatar,
  userID: state => state.user.id,
  token: state => state.user.token,
  article: state => state.article.article,
  list: state => state.article.list,
  total: state => state.article.total,
  archiveList: state => state.article.archiveList,
  pre: state => state.article.pre,
  next: state => state.article.next,
  comments: state => state.article.comments,
  commentCount: state => state.article.commentCount,
  count: state => state.article.count,
  category: state => state.category.list,
  tag: state => state.tag.list,
  global: state => state.app.global
}

export default getters

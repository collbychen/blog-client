import Cookies from 'js-cookie'

// 设置键名，这里我设置的是固定的
const TokenKey = 'COOKIE-TOKEN'
// 设置token
export function setToken (token) {
  // 创建有效期为5天的cookie
  const inFifteenMinutes = new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000)
  return Cookies.set(TokenKey, token, { expires: inFifteenMinutes })
}
// 获取token
export function getToken () {
  return Cookies.get(TokenKey)
}
// 删除token
export function removeToken () {
  return Cookies.remove(TokenKey)
}

/**
 *   函数节流
 *   @param {function}  callback
 *   @param {Number}  delay
 * */
export function throttle (callback, delay) {
  let timeout
  return function () {
    const args = arguments
    if (!timeout) {
      timeout = setTimeout(() => {
        timeout = null
        callback.apply(this, args)
      }, delay)
    }
  }
}

/**
 *   提取标题
 *   @param {String}  content
 *
 * */

export function getTitle (content) {
  let List = []
  const reg = /(#+)\s\S+/g
  const nav = []

  // 把所有标题找到
  List = content.match(reg)
  const len = List.length

  for (let i = 0; i < len; i++) {
    nav[i] = {
      level: List[i].match(/#+/)[0].length,
      children: [],
      title: List[i].match(/[^#+][^\s]\S*/)[0].replace(/\s/, '')
    }
  }

  //
  // nav.map((item, index) => {
  //   console.log(item)
  // })
  for (let i = 0; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      if (nav[i].level > nav[j].level) {
        nav[i].children.push(nav[j])
      }
    }
  }
  // console.log(nav)
  return List
}

/**
 *   位数补齐
 *   @param {String}  str    (要补的字符串)
 *   @param {Number}  location (0 前面, 1后面)
 *   @param {Number}  count    (小于多少位开始)
 *   @param {String}  patch    (补什么)
 * */
export function padLocation (str, location = 0, count = 2, patch = '0') {
  const arr = ['padStart', 'padEnd']
  if (typeof str === 'object') {
    return
  }
  if (typeof str === 'string') {
    return str[arr[location]](count, patch)
  } else if (typeof str === 'number') {
    return str.toString()[arr[location]](count, patch)
  }
}

const dateToMs = (date) => {
  return new Date(date).getTime()
}

/**
 *   时间转换 -- **前
 *   @param {Date}  date
 *
 *  1 分钟之前，返回“刚刚”
 * 1 分钟到 1 小时之间，返回“xx 分钟前”
 * 1 小时到 1 天之间，返回“xx 小时前”
 * 1 天到 1 个月（假设固定为 31 天）之间，返回“xx 天前”
 * 大于 1 个月，返回“xx 月前”
 * 大于 1 年，返回“xx 年前”
 * */

export const formDate = (date) => {
  // const ONE_SECOND = 1000   // 秒
  const ONE_MINUTE = 60000 // 分
  const ONE_HOUR = 3600000 // 时
  const ONE_DAY = 86400000 // 天
  const ONE_MONTH = 2629746000 // 月
  const ONE_YEAR = 31556952000 // 年
  // const ONE_SECOND_STR = '秒前'
  const ONE_MINUTE_STR = '分钟前'
  const ONE_HOUR_STR = '小时前'
  const ONE_DAY_STR = '天前'
  const ONE_MONTH_STR = '月前'
  const ONE_YEAR_STR = '年前'
  const time = Date.now() - dateToMs(date)
  if (time < ONE_MINUTE) {
    return '刚刚'
  } else if (time < ONE_HOUR) { // 分钟
    return ~~(time / ONE_MINUTE) + ONE_MINUTE_STR
  } else if (time < ONE_DAY) { // 小时
    return ~~(time / ONE_HOUR) + ONE_HOUR_STR
  } else if (time < ONE_MONTH) { // 天
    return ~~(time / ONE_DAY) + ONE_DAY_STR
  } else if (time < ONE_YEAR) { // 月
    return ~~(time / ONE_MONTH) + ONE_MONTH_STR
  } else { // 年
    return ~~(time / ONE_YEAR) + ONE_YEAR_STR
  }
}

export function parseTime (time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}年{m}月{d}日'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) { time = parseInt(time) * 1000 }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  return format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
}

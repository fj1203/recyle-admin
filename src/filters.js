import Vue from 'vue'
Vue.filter('dateFormat', (val, fmt) => val ? dateFormat(val, fmt) : '')
const dateFormat = (date, fmt = 'yyyy-MM-dd hh:mm:ss') => {
  if (date) date = (date instanceof Date) ? date : new Date(date)
  else return ''
  const o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    S: date.getMilliseconds()
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (`${date.getFullYear()}`).substr(4 - RegExp.$1.length))
  }
  Object.keys(o).forEach((k) => {
    if (new RegExp(`(${k})`).test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : ((`00${o[k]}`).substr((`${o[k]}`).length)))
    }
  })
  return fmt
}
Vue.filter('STATE', (val) => {
  const state = {
    '1': '待接单',
    '2': '已接单',
    '4': '已完成',
    '5': '已取消',
    '6': '系统取消'
  }
  return state[val]
})
Vue.filter('WORDERSTATUS', (val) => {
  const state = {
    '1': '已审核',
    '2': '待审核'
  }
  return state[val]
})

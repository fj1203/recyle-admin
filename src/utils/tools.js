export const dateFormat = (date, fmt = 'yyyy-MM-dd hh:mm:ss') => {
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
export const addDate = (date, days) => {
  var d = new Date(date)
  d.setDate(d.getDate() + days)
  var month = d.getMonth() + 1
  var day = d.getDate()
  if (month < 10) {
    month = '0' + month
  }
  if (day < 10) {
    day = '0' + day
  }
  var val = d.getFullYear() + '/' + month + '/' + day
  return val
}

import request from '@/utils/request'

export function getUserList(data) {
  return request({
    url: 'AdUser/userList',
    method: 'post',
    data
  })
}
export function delUser(params) {
  return request({
    url: 'AdUser/delUser',
    method: 'get',
    params
  })
}
export function getWorkerList(data) {
  return request({
    url: 'AdUser/workerList',
    method: 'post',
    data
  })
}
export function uploadFace(data) {
  return request({
    url: 'dic/uploadFace',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }

  })
}
export function getPrice(params) {
  return request({
    url: 'dic/getPrice',
    method: 'get',
    params
  })
}
export function setPrice(params) {
  return request({
    url: 'dic/setPrice',
    method: 'get',
    params
  })
}
export function getContent(params) {
  return request({
    url: 'dic/getContent',
    method: 'get',
    params
  })
}
export function setContent(params) {
  return request({
    url: 'dic/setContent',
    method: 'get',
    params
  })
}
export function getPic(params) {
  return request({
    url: 'dic/getPic',
    method: 'get',
    params
  })
}
export function setPic(params) {
  return request({
    url: 'dic/setPic',
    method: 'get',
    params
  })
}
export function orderList(data) {
  return request({
    url: 'AdOrder/orderList',
    method: 'post',
    data
  })
}
export function delWorker(params) {
  return request({
    url: 'AdUser/delWorker',
    method: 'get',
    params
  })
}
export function cancelOrderByAdmin(data) {
  return request({
    url: 'AdOrder/cancelOrderByAdmin',
    method: 'post',
    data
  })
}
export function delPic(params) {
  return request({
    url: 'dic/delPic',
    method: 'get',
    params
  })
}
export function changeWorker(params) {
  return request({
    url: 'AdUser/changeWorker',
    method: 'get',
    params
  })
}
export function count(data) {
  return request({
    url: 'AdOrder/count',
    method: 'post',
    data
  })
}

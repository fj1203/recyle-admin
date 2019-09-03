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

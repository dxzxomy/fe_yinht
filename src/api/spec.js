import request from '@/utils/request'

export function getNav(id, query) {
  return request({
    url: '/v1/spec/nav/' + id,
    method: 'get',
    params: query
  })
}

export function getNavList(query) {
  return request({
    url: '/v1/spec/nav',
    method: 'get',
    params: query
  })
}

export function createNav(data) {
  return request({
    url: '/v1/spec/nav',
    method: 'post',
    data
  })
}

export function updateNav(id, data) {
  return request({
    url: '/v1/spec/nav/' + id,
    method: 'put',
    data
  })
}

export function deleteNav(id, data) {
  return request({
    url: '/v1/spec/nav/' + id,
    method: 'delete',
    data
  })
}

export function uploadAvatar() {
  return request({
    url: '/v1/spec/upload_avatar'
  })
}

import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/v1/auth/user/login',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/v1/system/user/info',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/v1/auth//user/logout',
    method: 'post'
  })
}

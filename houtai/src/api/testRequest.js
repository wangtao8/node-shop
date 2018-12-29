import request from '../utlis/request'

export function fetchList(query) {
    return request({
      url: '/test',
      method: 'get',
      params: query
    })
  }

export function upload(query) {
    return request({
        url: '/upload',
        method: 'post',
        headers: { 'Content-Type': 'multipart/form-data' },
        params: query
    })
}
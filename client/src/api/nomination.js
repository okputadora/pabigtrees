import { request } from '@/utils/request'

export const getNominations = () => (
  request({
    method: 'GET',
    url: '/nominations',
  })
)

export const nominateTree = (data) => (
  request({
    method: 'POST',
    url: '/nominations',
    data,
  })
)

export const uploadFiles = (files) => (
  request({
    method: 'POST',
    url: '/nominations/upload',
    data: files,
  })
)

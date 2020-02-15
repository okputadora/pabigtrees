import { request } from '@/utils/request'

export const getNominations = () => (
  request({
    method: 'GET',
    url: '/nominations',
  })
)

export const getNomination = (id) => (
  request({
    method: 'GET',
    url: `/nominations/${id}`,
  })
)

export const nominateTree = (data) => (
  request({
    method: 'POST',
    url: '/nominations',
    data,
  })
)

export const uploadFiles = (files) => {
  const formData = new FormData()
  files.forEach((file) => formData.append('photo', file))
  return (
    request({
      method: 'POST',
      headers: {
        'content-type': 'multipart/form-data',
      },
      url: '/nominations/upload',
      data: formData,
    })
  )
}

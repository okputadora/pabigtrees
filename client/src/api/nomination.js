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

export const uploadFiles = (files) => {
  const formData = new FormData()
  files.forEach((file) => formData.append('photo', file))
  console.log({ formData })
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

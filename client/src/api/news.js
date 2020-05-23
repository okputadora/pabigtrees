import { request } from '@/utils/request'

export const getNews = () => (
  request({
    method: 'GET',
    url: '/news',
  })
)

export const updateNewsEntry = (data) => {
  request({
    method: 'PUT',
    url: '/news',
    data,
  })
}

export const createNewsEntry = (data) => (
  request({
    method: 'POST',
    url: '/news',
    data,
  })
)

export const uploadNewsImage = (files) => {
  const formData = new FormData()
  files.forEach((file) => formData.append('photo', file))
  return (
    request({
      method: 'POST',
      headers: {
        'content-type': 'multipart/form-data',
      },
      url: '/news/upload',
      data: formData,
    })
  )
}

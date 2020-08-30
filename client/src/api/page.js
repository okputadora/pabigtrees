import { request } from '@/utils/request'

export const getPageData = (title) => (
  request({
    method: 'GET',
    url: `/pages/${title}`,
  })
)

export const updateSection = (section) => (
  request({
    method: 'PUT',
    url: 'pages/section',
    data: section,
  })
)

export const createSection = (section) => (
  request({
    method: 'POST',
    url: 'pages/section',
    data: section,
  })
)

export const uploadImages = (files) => {
  const formData = new FormData()
  files.forEach((file) => formData.append('photo', file))
  return (
    request({
      method: 'POST',
      headers: {
        'content-type': 'multipart/form-data',
      },
      url: '/pages/upload',
      data: formData,
    })
  )
}

export default {}

import { request } from '@/utils/request'

export const getNominations = () => (
  request({
    method: 'GET',
    url: '/nominations', // add filter query for fetching isApproved
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

export const confirmNomination = (id, data) => (
  request({
    method: 'PUT',
    url: `/nominations/approval/${id}`,
    data,
  })
)

export const removeImage = (imagePath) => (
  request({
    method: 'DELETE',
    url: `/nominations/image/${imagePath}`,
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

export const deleteNomination = (id) => (
  request({
    method: 'DELETE',
    url: `/nominations/${id}`,
  })
)

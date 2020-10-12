import { request, buildTreeQuery } from '@/utils/request'

export const getTreeImages = (id) => (
  request({
    method: 'GET',
    url: `/trees/image/${id}`,
  })
)

export const getTrees = (filters, isAdmin) => (
  request({
    method: 'GET',
    url: buildTreeQuery(filters, isAdmin),
  })
)

export const getSpeciesAndGenera = () => (
  request({
    method: 'GET',
    url: '/trees/filter-lists',
  })
)

export const getTreeForAdmin = (id) => (
  request({
    method: 'GET',
    url: `/trees/admin/${id}`,
  })
)

export const updateTree = (id, body) => (
  request({
    method: 'PUT',
    url: `/trees/${id}`,
    data: body,
  })
)

export const uploadImages = (files, treeId) => {
  const formData = new FormData()
  files.forEach((file) => formData.append('photo', file))
  return (
    request({
      method: 'POST',
      headers: {
        'content-type': 'multipart/form-data',
      },
      url: `/trees/upload/${treeId}`,
      data: formData,
    })
  )
}

export const removeImage = (id) => request({
  method: 'DELETE',
  url: `/trees/image/${id}`,
})

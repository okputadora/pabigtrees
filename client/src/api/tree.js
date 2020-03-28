import { request, buildTreeQuery } from '@/utils/request'

export const getTreeImages = (id) => (
  request({
    method: 'GET',
    url: `/trees/image/${id}`,
  })
)

export const getTrees = (filters) => (
  request({
    method: 'GET',
    url: buildTreeQuery(filters),
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

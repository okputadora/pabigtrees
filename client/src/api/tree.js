import { request, buildTreeQuery } from '@/utils/request'

export const getTreeData = (id) => (
  request({
    method: 'GET',
    url: `/trees/${id}`,
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

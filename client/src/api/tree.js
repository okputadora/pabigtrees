import { request } from '@/utils/request'

export const getTreeData = (id, filters) => (
  request({
    method: 'GET',
    url: `/trees/${id}`,
    params: filters,

  })
)

export const getTrees = (filters) => (
  request({
    method: 'get',
    url: '/trees',
  })
)

export const getSpeciesAndGenera = () => (
  request({
    method: 'get',
    url: '/trees/filters',
  })
)

export default {}

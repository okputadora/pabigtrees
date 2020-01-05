import { request } from '@/utils/request'

export const getTreeData = (id) => (
  request({
    method: 'GET',
    url: `/trees/${id}`,
  })
)

export const getTrees = (filters, keyword) => (
  request({
    method: 'get',
    url: '/trees',
    params: { ...filters, keyword },
  })
)

export const getFilterLists = () => (
  request({
    method: 'get',
    url: '/trees/filters',
  })
)

export default {}

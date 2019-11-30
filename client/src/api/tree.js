import { request } from '@/utils/request'

export const getTreeData = (id) => (
  request({
    method: 'GET',
    url: `/trees/${id}`,
  })
)

export const getTrees = (filters) => (
  request({
    method: 'get',
    url: '/trees',
  })
)

export default {}

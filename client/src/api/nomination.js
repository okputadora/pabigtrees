import { request } from '@/utils/request'

export const nominateTree = (data) => (
  request({
    method: 'POST',
    url: '/trees/nominate',
    data,
  })
)

export default {}

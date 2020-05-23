import { request } from '@/utils/request'

export default () => (
  request({
    method: 'GET',
    url: '/news',
  })
)

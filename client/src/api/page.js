import { request } from '@/utils/request'

export const getPageData = (id) => (
  request({
    method: 'GET',
    url: `/pages/${id}`,
  })
)

export default {}

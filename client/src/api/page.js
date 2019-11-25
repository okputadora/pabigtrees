import { request } from '@/utils/request'

export const getPageData = (pageName) => (
  request({
    method: 'GET',
    url: `/pages/${pageName}`,
  })
)

export default {}

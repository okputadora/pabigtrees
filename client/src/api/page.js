import { request } from '@/utils/request'

export const getPageData = (title) => (
  request({
    method: 'GET',
    url: `/pages/${title}`,
  })
)

export const updateSection = (section) => (
  request({
    method: 'PUT',
    url: 'pages/sections',
    data: section,
  })
)

export default {}

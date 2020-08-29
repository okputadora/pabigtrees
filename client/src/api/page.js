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
    url: 'pages/section',
    data: section,
  })
)

export const createSection = (section) => (
  request({
    method: 'POST',
    url: 'pages/section',
    data: section,
  })
)

export default {}

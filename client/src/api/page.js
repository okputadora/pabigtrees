import { request } from '@/utils/request'

export const getPageData = (id) => (
  request({
    method: 'GET',
    url: `/pages/${id}`,
  })
)

export const updateSections = (sections) => (
  request({
    method: 'PUT',
    url: 'pages/sections',
    data: sections,
  })
)

export default {}

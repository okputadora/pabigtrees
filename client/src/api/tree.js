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
    // params: filters,
  })
)

export const getSpeciesAndGenera = ({ activeSpecies = {}, activeGenus = {} }) => {
  const { id: genusId } = activeGenus
  const { id: speciesId } = activeSpecies
  return request({
    method: 'GET',
    url: `/trees/filter-lists/?activeSpecies=${speciesId}&activeGenus=${genusId}`,
  })
}

export default {}

import { request } from '@/utils/request'

export const addSpecies = (newSpecies, existingGenusId, newCommonName) => (
  request({
    method: 'POST',
    url: '/classification/species',
    data: { newSpecies, existingGenusId, newCommonName },
  })
)

export const addSpeciesAndGenus = (newSpecies, newGenus, newCommonName) => (
  request({
    method: 'POST',
    url: '/classification/species-and-genus',
    data: { newSpecies, newGenus, newCommonName },
  })
)

import axios from 'axios'

import { BASE_URL } from '@/config'
// @ todo get token from cookies to send w/ req
export const request = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
})

export const buildTreeQuery = ({
  activeSpecies,
  activeGenus,
  activeCounty,
  sortField,
  sortOrder,
  page,
  pageSize,
  isMultiStemmedIncluded,
  isNationalChamp,
  isTallestOfSpecies,
}, isAdmin = false) => {
  const { id: speciesId } = activeSpecies
  const { id: genusId } = activeGenus
  const { id: countyId } = activeCounty
  return `/trees?activeSpecies=${speciesId}&activeGenus=${genusId}&activeCounty=${countyId}&sortField=${sortField}&sortOrder=${sortOrder}&page=${page}&pageSize=${pageSize}
  &isMultiStemmedIncluded=${isMultiStemmedIncluded}&isNationalChamp=${isNationalChamp}&isTallestOfSpecies=${isTallestOfSpecies}&isAdmin=${isAdmin}`
}

export default {}

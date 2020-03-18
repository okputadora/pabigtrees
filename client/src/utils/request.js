import axios from 'axios'

// @ todo get token from cookies to send w/ req
export const request = axios.create({
  baseURL: 'http://localhost:4000/',
  // @TODO set headers
})

export const buildTreeQuery = ({
  activeSpecies,
  activeGenus,
  keyword,
  sortField,
  sortOrder,
  page,
  pageSize,
}) => {
  const { id: speciesId } = activeSpecies
  const { id: genusId } = activeGenus
  return `/trees?activeSpecies=${speciesId}&activeGenus=${genusId}&sortField=${sortField}&sortOrder=${sortOrder}&page=${page}&pageSize=${pageSize}`
}

export default {}

import axios from 'axios'

const getApiUrl = () => {
  switch (process.env.NODE_ENV) {
    case 'development':
      return 'http://localhost:4000'
    case 'production':
      return 'https://bigtrees.herokuapp.com/'
    default:
      return 'https://bigtrees.herokuapp.com/'
  }
}
const baseURL = getApiUrl()
// @ todo get token from cookies to send w/ req
export const request = axios.create({ baseURL })

export const buildTreeQuery = ({
  activeSpecies,
  activeGenus,
  keyword,
  sortField,
  sortOrder,
  page,
  pageSize,
  isMultiStemmedIncluded,
  isNationalChamp,
  isTallestOfSpecies,
}) => {
  const { id: speciesId } = activeSpecies
  const { id: genusId } = activeGenus
  return `/trees?activeSpecies=${speciesId}&activeGenus=${genusId}&sortField=${sortField}&sortOrder=${sortOrder}&page=${page}&pageSize=${pageSize}
  &isMultiStemmedIncluded=${isMultiStemmedIncluded}&isNationalChamp=${isNationalChamp}&isTallestOfSpecies=${isTallestOfSpecies}`
}

export default {}

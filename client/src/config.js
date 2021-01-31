export const BASE_URL = (() => {
  switch (process.env.NODE_ENV) {
    case 'development':
      return 'http://localhost:4000'
    case 'production':
      return 'http://pabigtre.wwwmi3-ss55.a2hosted.com'
    default:
      return 'https://bigtrees.herokuapp.com'
  }
})()

export default {}

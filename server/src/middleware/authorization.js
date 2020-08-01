import jwt from 'jsonwebtoken'

export function authenticateToken(req, res, next) {
  // Gather the jwt access token from the request header
  const authHeader = req.headers.cookie
  const token = authHeader && authHeader.split('user=')[1]
  if (token == null) return res.sendStatus(401) // if there isn't any token

  return jwt.verify(token, process.env.SECRET, (err, user) => {
    console.log(err)
    if (err) return res.sendStatus(403)
    req.user = user
    return next() // pass the execution off to whatever request the client intended
  })
}

export default {}

import Joi from '@hapi/joi'
import jwt from 'jsonwebtoken'

import { IN_PROD, SECRET } from './config'

export const validateRequest = (schema) => (req, res, next) => {
  const joiSchema = Joi.object(schema)
  const validated = joiSchema.validate(req.body)
  if (validated) return next()
  throw new Error('Schema is not valid')
}

export const issueToken = (user, res) => {
  const payload = user.authSummary()
  const token = jwt.sign(payload, SECRET, {
    expiresIn: '2d',
  })
  res.cookie('user', token, {
    httpOnly: true,
    secure: IN_PROD,
    maxAge: 1000 * 60 * 60 * 24 * 2,
  })
}

import { Router } from 'express'
import Joi from '@hapi/joi'

import { validateRequest } from '../utils'

const router = Router()

const validation = validateRequest({
  accountId: Joi.string().required().label('Account ID'),
  oauthToken: Joi.string().required().label('OAuth Token'),
})

router.post('/logout', validation, async (req, res, next) => {
  try {
    res.cookie().destroy()
  } catch (err) {
    throw Error(err)
  }
})

export default router

import { Router } from 'express'
import Joi from '@hapi/joi'
import bcrypt from 'bcrypt'

import { validateRequest, issueToken } from '../utils'
import User from '../models/user'

const router = Router()

const validation = validateRequest({
  username: Joi.string().required(),
  password: Joi.string().required(),
})

router.post('/', async (req, res) => {
  console.log('are we here????')
  try {
    console.log(req.body)
    const { username, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 8)
    const user = User.create({ username, password: hashedPassword })
    issueToken(user, res)
    console.log(res.cookie)
    res.json({ user })
  } catch (e) {
    console.log(e)
    throw new Error(e)
  }
})

export default router

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

router.post('/', validation, async (req, res) => {
  try {
    const { username, password } = req
    const hashedPassword = await bcrypt.hash(password, 8)
    const user = User.create({ username, password: hashedPassword })
    issueToken(user, res)
    // console.log(res.cookie)
    res.json({ user })
  } catch (e) {
    throw new Error(e)
  }
  res.json({ success: true })
  // const { username, password } = req.body
  // try {
  //   // const token = await attemptLogin(username, password)
  //   res.cookie(
  //     'token',
  //     token,
  //     { expires: new Date(Date.now() + 900000), httpOnly: true }
  //   )
  // } catch (err) {
  //   throw Error(err)
  // }
})

export default router

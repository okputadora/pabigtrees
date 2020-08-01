import { Router } from 'express'
import Joi from '@hapi/joi'
import bcrypt from 'bcrypt'

import models from '../models'
import { validateRequest, issueToken } from '../utils'

const router = Router()
const validation = validateRequest({
  username: Joi.string().required(),
  password: Joi.string().required(),
})

router.post('/signup', validation, async (req, res) => {
  try {
    const { username, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 8)
    const user = models.create({ username, password: hashedPassword })
    res.json({ user })
  } catch (e) {
    throw new Error(e)
  }
  res.json({ success: true })
})

router.post('/', validation, async (req, res) => {
  try {
    const { username, password } = req.body
    const [user] = await models.users.findAll({ where: { username } })
    if (!user) {
      res.status(404).send()
    }
    const match = await bcrypt.compare(password, user.password)
    if (match) {
      const token = issueToken(user, res)
      res.status(200).send({ token })
    } else {
      res.status(401).send('Incorrect Password')
    }
  } catch (err) {
    res.status(500).send(err)
  }
})

router.post('/auth')
export default router

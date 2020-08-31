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
    console.log('there is a user')
    const match = await bcrypt.compare(password, user.password)
    console.log('password matched')
    if (match) {
      console.log('was a mach')
      const token = issueToken(user, res)
      console.log('issued token')
      res.status(200).send({ token })
    } else {
      console.log('was not a match')
      res.status(401).send('Incorrect Password')
    }
  } catch (err) {
    console.log({err})
    res.status(500).send(err)
  }
})

export default router

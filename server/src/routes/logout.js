import { Router } from 'express'

const router = Router()

router.post('/', async (req, res) => {
  try {
    res.status(200).clearCookie('user').json({})
  } catch (err) {
    throw Error(err)
  }
})

export default router

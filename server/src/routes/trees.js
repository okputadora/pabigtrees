import { Router } from 'express'
import models from '../models'

const router = Router()

router.get('/', (req, res, next) => {
  models.Tree.findAll({ limit: 10 }).then(trees => {
    res.json({ trees })
  })
})

export default router

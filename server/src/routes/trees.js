import { Router } from 'express'
import models from '../models'

const router = Router()

router.get('/', (req, res, next) => {
  models.trees.findAll({
    limit: 10,
    include: [
      { model: models.species, include: [{ model: models.genus }] },
      { model: models.counties },
    ],
  }).then(trees => {
    console.log(JSON.stringify(trees, null, 2))
    res.json({ trees })
  })
})

export default router

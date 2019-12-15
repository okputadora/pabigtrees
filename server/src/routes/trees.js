import { Router } from 'express'
import models from '../models'
import { keyMap } from '../utils'

const router = Router()

router.get('/', (req, res, next) => {
  const { sortField = 'points', sortOrder = 'DESC' } = req.query
  console.log(req.query)
  console.log(typeof desc)
  let order = [keyMap[sortField], sortOrder]
  if (sortField === 'genus') {
    order = [models.species, { model: models.genus, as: 't_genus' }, 't_genus', sortOrder]
  } else if (sortField === 'species') {
    order = [models.species, 't_species', sortOrder]
  } else if (sortField === 'commonName') {
    order = [models.species, keyMap[sortField], sortOrder]
  }
  console.log('ORDER: ', order)
  models.trees.findAll({
    limit: 20,
    include: [
      { model: models.species, include: [{ model: models.genus }] },
      { model: models.counties },
    ],
    order: [order],
  }).then(trees => {
    res.json({ trees })
  })
})

export default router

import { Router } from 'express'
import { Op } from 'sequelize'

import models from '../models'
import { keyMap } from '../utils'

const router = Router()

router.get('/', (req, res, next) => {
  const { sortField = 'points', sortOrder = 'DESC', keyword } = req.query
  let order = [keyMap[sortField], sortOrder]
  if (sortField === 'genus') {
    order = [models.species, { model: models.genus, as: 't_genus' }, 't_genus', sortOrder]
  } else if (sortField === 'species') {
    order = [models.species, 't_species', sortOrder]
  } else if (sortField === 'commonName') {
    order = [models.species, keyMap[sortField], sortOrder]
  }
  models.trees.findAll({
    limit: 20,
    include: [
      { model: models.species, where: { t_species: keyword }, include: [{ model: models.genus }] },
      { model: models.counties },
    ],
    order: [order],
  }).then(trees => {
    console.log('finding trees')
    console.log(Object.keys(trees[0].Species))
    res.json({ trees })
  })
})

export default router

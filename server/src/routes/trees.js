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
      { model: models.species, include: [{ model: models.genus }] },
      { model: models.counties },
    ],
    order: [order],
  }).then(trees => {
    res.json({ trees })
  })
})

router.get('/filters', (req, res) => {
  models.species.findAll({ include: models.genus }).then(data => {
    const species = data.map(d => d.t_species)
    const genera = data.map(d => d.Genus.t_genus)
    const uniqueGenera = [...new Set(genera)]
    res.json({ species, genera: uniqueGenera })
  })
})

export default router

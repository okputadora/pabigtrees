import { Router } from 'express'
import { Op } from 'sequelize'

import models from '../models'
import { keyMap } from '../utils'

const router = Router()

router.get('/', (req, res, next) => {
  const {
    sortField = 'points', sortOrder = 'DESC', keyword, activeGenus,
  } = req.query
  let order = [keyMap[sortField], sortOrder]
  if (sortField === 'genus') {
    order = [models.species, { model: models.genus, as: 't_genus' }, 't_genus', sortOrder]
  } else if (sortField === 'species') {
    order = [models.species, 't_species', sortOrder]
  } else if (sortField === 'commonName') {
    order = [models.species, keyMap[sortField], sortOrder]
  }
  models.trees.findAll({
    include: [
      { model: models.species, required: true, include: [{ model: models.genus, where: { t_genus: activeGenus === 'All' ? '*' : activeGenus } }] },
      { model: models.counties },
    ],
    order: [order],
    limit: 20,
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

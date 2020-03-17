import { Router } from 'express'
import { Op } from 'sequelize'

import models from '../models'
import { keyMap } from '../utils'

const router = Router()

router.get('/', (req, res, next) => {
  const {
    sortField = 'points',
    sortOrder = 'DESC',
    activeGenus = 'All',
    activeSpecies = 'All',
    keyword,
  } = req.query
  let order = [keyMap[sortField], sortOrder]
  if (sortField === 'genus') {
    order = [models.species, { model: models.genus, as: 't_genus' }, 't_genus', sortOrder]
  } else if (sortField === 'species') {
    order = [models.species, 't_species', sortOrder]
  } else if (sortField === 'commonName') {
    order = [models.species, keyMap[sortField], sortOrder]
  }
  console.log({ activeGenus })
  console.log({ activeSpecies })
  const genusQuery = { model: models.genus }
  const speciesQuery = {
    model: models.species,
    required: true,
    include: [genusQuery],
  }
  if (activeGenus !== 'All') {
    speciesQuery.where = { k_genus: activeGenus }
  }
  if (activeSpecies !== 'All') {
    if (!speciesQuery.where) {
      speciesQuery.where = {}
    }
    speciesQuery.where.id = activeSpecies
  }
  const countyQuery = { model: models.counties }
  models.trees.findAll({
    include: [
      speciesQuery,
      countyQuery,
    ],
    order: [order],
    limit: 20,
  }).then(trees => {
    res.json({ trees })
  }).catch(e => {
    console.log({ efetching: e })
  })
})

router.get('/filters', (req, res) => {
  models.species.findAll({ include: models.genus }).then(data => {
    const species = data.map(d => ({ name: d.t_species, id: d.id }))

    // get unique genera list
    const genera = data.map(d => ({ name: d.Genus.t_genus, id: d.k_genus }))
    const uniqueGenera = []
    const map = new Map()
    genera.forEach(item => {
      if (!map.has(item.id)) {
        map.set(item.id, true) // set any value to Map
        uniqueGenera.push({
          id: item.id,
          name: item.name,
        })
      }
    })
    res.json({ species, genera: uniqueGenera })
  })
})

export default router

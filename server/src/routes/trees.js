import { Router } from 'express'

import models from '../models'
import { keyMap } from '../utils'

const router = Router()

router.get('/', (req, res, next) => {
  const {
    sortField = 'points',
    sortOrder = 'DESC',
    activeGenus = 'All',
    activeSpecies = 'All',
    page = 1,
    pageSize = 20,
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
  // @TODO validate there requests
  models.trees.findAll({
    include: [
      speciesQuery,
      countyQuery,
    ],
    order: [order],
    limit: parseInt(pageSize, 10),
    offset: (parseInt(page, 10) - 1) * parseInt(pageSize, 10),
  }).then(trees => {
    res.json({ trees })
  }).catch(e => {
    console.log({ efetching: e })
  })
})

router.get('/image/:id', (req, res) => {
  const { id } = req.params
  models.treeImages.findAll({ where: { k_tree: id, f_active: 1 } }).then((treeImages) => {
    console.log(treeImages)
    res.json(treeImages)
  }).catch(e => {
    console.log(e)
    res.status(500).send()
  })
})

router.get('/filter-lists', (req, res) => {
  const speciesQuery = { include: models.genus }
  models.species.findAll(speciesQuery).then(data => {
    const species = data.map(d => ({ name: d.t_species, id: d.id, genusId: d.k_genus }))
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

router.get('/admin/:id', (req, res) => {
  console.log('we in here!!!, ', req.params.id)
  const genusQuery = { model: models.genus }
  const speciesQuery = {
    model: models.species,
    required: true,
    include: [genusQuery],
  }
  const countyQuery = { model: models.counties }
  models.trees.findByPk(req.params.id, { include: [speciesQuery, countyQuery] }).then(tree => {
    console.log(tree)
    res.json(tree)
  }).catch(e => {
    console.log({ e })
    res.status(500).send()
  })
})

export default router

import { Router } from 'express'
import multer from 'multer'
import jwt from 'jsonwebtoken'
import { Parser } from 'json2csv'

import models from '../models'
import { keyMap } from '../utils'
import { authenticateToken } from '../middleware/authorization'


const router = Router()

router.get('/', async (req, res) => {
  const {
    sortField = 'points',
    sortOrder = 'DESC',
    activeGenus = 'All',
    activeSpecies = 'All',
    activeCounty = 'All',
    page = 1,
    pageSize = 20,
    isMultiStemmedIncluded = 'true',
    isNationalChamp = false,
    isTallestOfSpecies = false,
    isAdmin = false,
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
  const countyQuery = { model: models.counties }
  if (activeGenus !== 'All') {
    speciesQuery.where = { k_genus: activeGenus }
  }
  if (activeSpecies !== 'All') {
    if (!speciesQuery.where) {
      speciesQuery.where = {}
    }
    speciesQuery.where.id = activeSpecies
  }
  if (activeCounty !== 'All') {
    countyQuery.where = { id: activeCounty }
  }
  const multiStemmedQuery = isMultiStemmedIncluded === 'false' && { f_multistemmed: 0 }
  const champQuery = isNationalChamp === 'true' && { f_national_champ: 1 }
  const tallestQuery = isTallestOfSpecies === 'true' && { f_tallest: 1 }

  // refactor middleware so we dont have to duplicate this
  let isAdminVerified = false
  const authHeader = req.headers.cookie
  const token = authHeader && authHeader.split('user=')[1]
  if (token) {
    try {
      const response = await jwt.verify(token, process.env.SECRET)
      isAdminVerified = !!response
    } catch (err) {
      isAdminVerified = false
    }
  }
  const additionalQueries = {
    where: {
      ...multiStemmedQuery, ...champQuery, ...tallestQuery, ...isAdmin !== 'false' && isAdminVerified ? { } : { isPublic: 1 },
    },
  }
  // @TODO validate the requests
  try {
    const { count, rows: trees } = await models.trees.findAndCountAll({
      ...additionalQueries,
      include: [
        speciesQuery,
        countyQuery,
      ],
      order: [order],
      limit: parseInt(pageSize, 10),
      offset: (parseInt(page, 10) - 1) * parseInt(pageSize, 10),
    })
    res.json({ count, trees })
  } catch (error) {
    res.status(500).json({ error })
  }
})

router.get('/csv', authenticateToken, async (req, res) => {
  try {
    const genusQuery = { model: models.genus }
    const speciesQuery = {
      model: models.species,
      required: true,
      include: [genusQuery],
    }
    const countyQuery = { model: models.counties }
    const { rows: trees } = await models.trees.findAndCountAll({ include: [speciesQuery, countyQuery] })
    const currentDate = Date.now()
    const fileName = `${currentDate}.csv`
    const opts = { fields: [...Object.keys(trees[0].dataValues), 'commonName', 'genus'] }
    const parser = new Parser(opts)
    const csv = parser.parse(trees.map(t => ({
      ...t.dataValues,
      species: t.dataValues.species.dataValues.t_species,
      genus: t.dataValues.species.dataValues.genus.dataValues.t_genus,
      commonName: t.dataValues.species.dataValues.t_common,
    })))
    res.setHeader('Content-Disposition', `attachment; filename=${fileName}`)
    res.set('Content-Type', 'text/csv')
    res.send(csv)
  } catch (err) {
    res.status(500).send(err)
  }
})


router.get('/image/:id', (req, res) => {
  const { id } = req.params
  models.treeImages.findAll({ where: { k_tree: id, f_active: 1 } }).then((treeImages) => {
    res.json(treeImages)
  }).catch(error => {
    res.status(500).json({ error })
  })
})

router.get('/filter-lists', async (req, res) => {
  const speciesQuery = { include: models.genus }
  const counties = await models.counties.findAll()
  const data = await models.species.findAll(speciesQuery)
  const species = data.map(d => ({ name: d.t_species, id: d.id, genusId: d.k_genus })).sort((a, b) => (a.name > b.name ? 1 : -1))
  // get unique genera list
  const genera = data.map(d => ({ name: d.genus.t_genus, id: d.k_genus, speciesId: d.id })).sort((a, b) => (a.name > b.name ? 1 : -1))
  const commonNames = data.map(d => ({ name: d.t_common, id: d.id, genusId: d.k_genus })).sort((a, b) => (a.name > b.name ? 1 : -1))
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
  res.json({
    species, genera: uniqueGenera, commonNames, counties: counties.map(c => ({ id: c.id, name: c.county })),
  })
})

router.get('/admin/:id', authenticateToken, (req, res) => {
  const genusQuery = { model: models.genus }
  const speciesQuery = {
    model: models.species,
    required: true,
    include: [genusQuery],
  }
  const countyQuery = { model: models.counties }
  models.trees.findByPk(req.params.id, { include: [speciesQuery, countyQuery] }).then(tree => {
    res.json(tree)
  }).catch(() => {
    res.status(500).send()
  })
})

router.get('/:id', async (req, res) => {
  const genusQuery = { model: models.genus }
  const speciesQuery = {
    model: models.species,
    required: true,
    include: [genusQuery],
  }
  const countyQuery = { model: models.counties }
  models.trees.findByPk(req.params.id, { include: [speciesQuery, countyQuery] }).then(tree => {
    res.json(tree)
  }).catch(() => {
    res.status(500).send()
  })
})
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { body, params: { id } } = req
    const tree = await models.trees.findByPk(id)
    Object.keys(body).forEach(key => {
      if (key !== 'species') { // species field is a complex object that we dont want to save...we just need species_id
        tree[key] = body[key]
      }
    })
    await tree.save()
    res.sendStatus(200)
  } catch (err) {
    res.status(500).send(err)
  }
})

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'public/treeImages/')
  },

  // By default, multer removes file extensions so let's add them back
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`)
  },
})

const imageFilter = (req, file, cb) => {
  // Accept images only
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG)$/)) {
    req.fileValidationError = 'Only image files are allowed!'
    // return cb('Only image files are allowed!', false)
  }
  return cb(null, true)
}
exports.imageFilter = imageFilter
const upload = multer({ storage, fileFilter: imageFilter })

router.post('/upload/:id', authenticateToken, upload.array('photo', 5), async (req, res) => {
  if (req.fileValidationError) {
    // save treeImage to db
    return res.status(415).send({ message: req.fileValidationError })
  }
  try {
    await Promise.all(req.files.map(img => models.treeImages.create({
      k_tree: req.params.id, img_location: img.filename, f_active: 1, isTest: 1,
    })))
    return res.json(req.files.map(f => f.filename))
  } catch (err) {
    return res.sendStatus(500).send(err)
  }
})

router.delete('/image/:id', authenticateToken, async (req, res) => {
  try {
    const treeImage = await models.treeImages.findByPk(req.params.id)
    if (!treeImage) {
      res.status(404).send({ err: 'we couldnt find that image' })
    }
    treeImage.f_active = 0
    await treeImage.save()
    res.sendStatus(200)
  } catch (err) {
    res.status(500).send(err)
  }
})


export default router

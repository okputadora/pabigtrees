import { Router } from 'express'
import multer from 'multer'
import fs from 'fs'
import uniqid from 'uniqid'

import db from '../models'
import { authenticateToken } from '../middleware/authorization'
import {
  formatAndValidateNomination,
  mapNominationToTree,
} from '../utils'

const router = Router()
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'public/uploads/')
  },

  // By default, multer removes file extensions so let's add them back
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`)
  },
})

const moveToTreeImages = imagePaths => Promise.all(imagePaths.map(img => new Promise((resolve, reject) => {
  fs.rename(`public/uploads/${img.location}`, `public/treeImages/${img.location}`, (err) => {
    if (err) reject(err)
    else resolve()
  })
})))

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

router.get('/', authenticateToken, (req, res) => {
  const countyQuery = { model: db.counties }
  const speciesQuery = { model: db.species }
  const genusQuery = { model: db.genus }
  let nominations
  db.nominations.findAll({
    where: { isTrashed: null },
    include: [
      countyQuery,
      genusQuery,
      speciesQuery,
    ],
  }).then(noms => {
    nominations = noms
    return Promise.all(noms.map(n => db.nominationImages.findAll({ where: { nominationId: n.id } })))
  }).then(nomImages => {
    const formattedNomImages = nomImages.map(imageArr => imageArr.map(image => image.dataValues.location))
    const nominationsWithImages = nominations.map((nom, i) => ({
      ...nom.toJSON(),
      imagePaths: formattedNomImages[i],
    }))
    res.json({ nominations: nominationsWithImages })
  }).catch(err => {
    res.status(500).json({ error: err })
  })
})

router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const countyQuery = { model: db.counties }
    const speciesQuery = { model: db.species }
    const genusQuery = { model: db.genus }
    const nomination = await db.nominations.findOne({ where: { id: req.params.id }, include: [countyQuery, speciesQuery, genusQuery] })
    const imagePaths = await db.nominationImages.findAll({ where: { nominationId: nomination.id } })
    res.json({ nomination, imagePaths })
  } catch (err) {
    res.json({ error: err })
  }
})

router.post('/upload', upload.array('photo', 5), async (req, res) => {
  if (req.fileValidationError) {
    return res.status(415).send({ message: req.fileValidationError })
  }
  return res.json(req.files.map(f => f.filename))
})

router.post('/', async (req, res) => {
  try {
    const formattedNomination = formatAndValidateNomination(req.body)
    const nom = await db.nominations.create(formattedNomination)
    await db.nominationImages.bulkCreate(formattedNomination.imagePaths.map(img => ({
      location: img,
      nominationId: nom.id,
    })))
    res.json({ success: true })
  } catch (e) {
    res.status(500).send(e)
  }
})

// nomination approval
// @TODO consider splitting this into two requests 1 for creating the tree (and genus and species if necessary) and the other for updating the
router.put('/approval/:id', async (req, res) => {
  try {
    // const validatedApproval = formatAndValidateApproval(req.body)
    const {
      genusName,
      speciesName,
      speciesId,
      genusId,
      commonNameNew,
      isPending,
    } = req.body
    let newGenus
    let newSpecies = {}
    if (!genusId) {
      newGenus = await db.genus.create({
        id: `GE${uniqid()}`, t_genus: genusName, t_common: genusName, test: true,
      })
    }
    if (!speciesId) {
      // create a species
      newSpecies = await db.species.create({
        id: `SP${uniqid()}`,
        k_genus: genusId || newGenus.id,
        t_species: speciesName,
        t_common: commonNameNew,
        test: true,
      })
    }
    if (isPending) {
      await db.nominations.update(req.body, { where: { id: req.params.id } })
      return res.status(200).send()
    }
    await db.nominations.update({ isApproved: true }, { where: { id: req.params.id } })

    const newTree = mapNominationToTree(req.body, newSpecies)
    const tree = await db.trees.create({ ...newTree, id: `TR${Date.now()}`, isTest: true })
    if (req.body.imagePaths && req.body.imagePaths.length > 0) {
      try {
        await Promise.all(req.body.imagePaths.map(img => db.treeImages.create({ k_tree: tree.id, img_location: img.location, f_active: 1 })))
        await moveToTreeImages(req.body.imagePaths)
      } catch (err) {
        res.json({ success: false, message: `The Nomination was approved, the tree was created, but we ran into an issue moving the images to the "trees" directory, ask Mike to look for the following images ${req.body.imagePaths.join(' , ')}` })
      }
    }
    return res.json({ success: true, tree })
  } catch (err) {
    return res.status(500).json({ error: err })
  }
})

router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    db.nominations.update({ isTrashed: true }, { where: { id: req.params.id } })
    res.status(200).send()
  } catch (err) {
    res.status(500).json({ error: err })
  }
})

export default router

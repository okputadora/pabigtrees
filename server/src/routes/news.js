import { Router } from 'express'
import fs from 'fs'
import multer from 'multer'
import moment from 'moment'

import { authenticateToken } from '../middleware/authorization'
import models from '../models'

const router = Router()

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'newsUploads/')
  },

  // By default, multer removes file extensions so let's add them back
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`)
  },
})

const moveNewsImages = imagePaths => Promise.all(imagePaths.map(img => new Promise((resolve, reject) => {
  fs.rename(`newsUploads/${img}`, `newsImages/${img}`, (err) => {
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

const upload = multer({ storage, fileFilter: imageFilter })

router.get('/', async (req, res) => {
  try {
    const news = await models.news.findAll({ where: { f_display: 1 }, order: [['create_date', 'DESC']] })
    const newsImages = await models.newsImages.findAll()
    const normalizedNewsImages = {}
    newsImages.forEach(image => { normalizedNewsImages[image.k_news] = image })
    res.json({ news, images: normalizedNewsImages })
  } catch (err) {
    res.status(500).json({ err })
  }
})

router.post('/', authenticateToken, async (req, res) => {
  try {
    // create entry
    const { body, title, images } = req.body
    const createDate = moment().toISOString()
    const newsEntry = await models.news.create({
      news_title: title,
      news_body: body,
      f_display: 1,
      create_date: createDate,
      last_update: createDate,
    })
    if (req.body.images && req.body.images.length > 0) {
      await models.newsImages.create({
        k_news: newsEntry.i_id,
        image_location: images[0],
        f_active: 1,
        create_date: createDate,
      })
      await moveNewsImages(images)
    }
    // move image
    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ error: err })
  }
})

router.post('/upload', authenticateToken, upload.array('photo', 5), async (req, res) => {
  if (req.fileValidationError) {
    return res.status(415).send({ message: req.fileValidationError })
  }
  return res.json(req.files.map(f => f.filename))
})

router.put('/', authenticateToken, async (req, res) => {
  const {
    body: {
      i_id: id, title, body, isPublic = true,
    },
  } = req
  try {
    const newsEntry = await models.news.findByPk(id)
    if (!isPublic) {
      // deleting
      newsEntry.f_display = 0
    } else {
      // updating
      newsEntry.news_body = body
      newsEntry.news_title = title
    }
    await newsEntry.save()
    res.json(newsEntry)
  } catch (err) {
    res.status(500).send()
  }
})

export default router

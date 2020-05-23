import { Router } from 'express'
import fs from 'fs'
import multer from 'multer'
import moment from 'moment'

import models from '../models'

const router = Router()

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'newsUploads/')
  },

  // By default, multer removes file extensions so let's add them back
  filename(req, file, cb) {
    console.log(file)

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
    const news = await models.news.findAll({ order: [['create_date', 'DESC']] })
    const newsImages = await models.newsImages.findAll()
    const normalizedNewsImages = {}
    newsImages.forEach(image => { normalizedNewsImages[image.k_news] = image })
    res.json({ news, images: normalizedNewsImages })
  } catch (err) {
    console.log({ err })
    res.status(500).json({ err })
  }
})

router.post('/', async (req, res) => {
  try {
    // create entry
    const { body, title, images } = req.body
    const createDate = moment().toISOString()
    const newsEntry = await models.news.create({
      // i_id: Date.now(),
      news_title: title,
      news_body: body,
      f_display: 1,
      create_date: createDate,
      last_update: createDate,
    })
    if (req.body.images && req.body.images.length > 0) {
      const image = await models.newsImages.create({
        // i_id: Date.now(),
        k_news: newsEntry.i_id,
        img_location: images[0],
        f_active: 1,
        create_date: createDate,
      })
      await moveNewsImages(images)
    }
    // move image
    res.json({ success: true })
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err })
  }
})

router.post('/upload', upload.array('photo', 5), async (req, res) => {
  if (req.fileValidationError) {
    return res.status(415).send({ message: req.fileValidationError })
  }
  return res.json(req.files.map(f => f.filename))
})


export default router

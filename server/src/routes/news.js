import { Router } from 'express'

import models from '../models'

const router = Router()

router.get('/', async (req, res) => {
  try {
    const news = await models.news.findAll({ order: [['create_date', 'DESC']] })
    const newsImages = await models.newsImages.findAll()
    const normalizedNewsImages = {}
    newsImages.forEach(image => { normalizedNewsImages[image.k_news] = image })
    // console.log({ normalizedNewsImages })
    // const newsWithImages = news.map(newsEntry => {
    //   console.log(newsEntry)
    //   return {
    //     ...newsEntry,
    //     news_image: normalizedNewsImages[newsEntry.i_id],
    //   }
    // })
    // console.log({ newsWithImages })
    res.json({ news, images: normalizedNewsImages })
  } catch (err) {
    console.log({ err })
    res.status(500).json({ err })
  }
})

export default router

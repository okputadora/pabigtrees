import { Router } from 'express'
import Page from '../mongoModels/Page'
import Section from '../mongoModels/Section'

const router = Router()

const samplePageData = {
  layout: 'TwoCol',
  column1: [0, 1, 2, 3],
  column2: [4, 5, 6, 7, 8, 9, 10],
  sections: [
    {
      component: 'Paragraph',
      index: 0,
      className: 'sampleClass',
      text: 'What literally covers the Commonwealth of Pennsylvania from A to Z? Trees! Trees of all kinds--from Abies to Ziziphus. Some of the largest of each species, are found here recorded on this website',
      page: '5de12e6538a99e3154370d02',
    },
    {
      page: '5de12e6538a99e3154370d02',
      component: 'Image',
      index: 1,
      className: 'center',
      src: 'http://www.pabigtrees.com/images/long_big_small1.jpg',
      alt: 'Longfellowpine',
      text: 'Longfellow Pine at Cook Forest State Park. This Eastern White Pine is the tallest tree in all of Northeastern United States at 184.7 feet tall, Clarion County',
    },
    {
      page: '5de12e6538a99e3154370d02',
      component: 'Header',
      index: 2,
      text: 'Who are we?',
    },
    {
      page: '5de12e6538a99e3154370d02',
      component: 'Paragraph',
      index: 3,
      text: "The Pennsylvania Forestry Association is a broad-based citizen's organization that provides leadership and education in sound, science-based forest management and promotes stewardship to ensure the sustainability of all forest resources, resulting in benefits for all, today and into the future. The Champion Tree Program is one of the many resources we provide to achieve our goals. A champion tree represents the laregest of each species of tree found in the state. Finding, measuring and nominating big trees is an enjoyable outdoor hobby. Join us!",
    },
    {
      component: 'BlogSummary',
      page: '5de12e6538a99e3154370d02',
      index: 4,
    },
    {
      component: 'Header',
      index: 5,
      alignment: 'center',
      page: '5de12e6538a99e3154370d02',
      text: 'Big Trees of Pennsylvania Register',
    },
    {
      component: 'Paragraph',
      index: 6,
      page: '5de12e6538a99e3154370d02',
      text: 'Thanks to all for your continued support of this program. We have over 1000 trees listed across the state that are big locally, or are the biggest in the state. You can submit trees for consideration for champion status to this website. In turn, trees that have National champion potential will be forwarded to American Forests.',
    },
    {
      component: 'Link',
      page: '5de12e6538a99e3154370d02',
      index: 7,
      className: 'right',
      text: 'americanforests.org',
      href: 'americanforests.org',
    },
    {
      page: '5de12e6538a99e3154370d02',
      component: 'Header',
      index: 8,
      alignment: 'center',
      text: 'Order Your register today!',
    },
    {
      page: '5de12e6538a99e3154370d02',
      component: 'Paragraph',
      index: 9,
      text: 'The 2011 edition of our book is available through this website for just $15 delivered. Please contact us for bulk/wholesale prices.',
    },
    {
      page: '5de12e6538a99e3154370d02',
      component: 'Image',
      alt: 'Paypal',
      src: 'http://www.pabigtrees.com/images/paypal.gif',
      className: 'center',
    },
  ],
}

// router.get('/ids', async (req, res) => {
//   const sections = await Section.find({})
//   res.json(sections.map(s => `ObjectId("${s._id}")`))
// })

router.get('/:id', async (req, res, next) => {
  const { id } = req.params
  const page = await Page.findById(id).populate('sections')
  res.json(page)
})

router.put('/sections', async (req, res, next) => {
  const sections = req.body
  try {
    await Promise.all(sections.map((s) => Section.findByIdAndUpdate(s._id, s)))
    res.status(200)
  } catch (err) {
    res.status(500)
  }
})

router.post('/', async (req, res) => {
  const page = await Page.create(req.body)
  res.json(page)
})


export default router

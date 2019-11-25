import { Router } from 'express'

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
      id: 'dhjklh4jklh4',
      text: 'What literally covers the Commonwealth of Pennsylvania from A to Z? Trees! Trees of all kinds--from Abies to Ziziphus. Some of the largest of each species, are found here recorded on this website',
    },
    {
      component: 'Image',
      index: 1,
      className: 'center',
      src: 'http://www.pabigtrees.com/images/long_big_small1.jpg',
      alt: 'Longfellowpine',
      id: 'fdah4798h',
      text: 'Longfellow Pine at Cook Forest State Park. This Eastern White Pine is the tallest tree in all of Northeastern United States at 184.7 feet tall, Clarion County',
    },
    {
      component: 'Header',
      index: 2,
      id: 'hupoh49b4844',
      text: 'Who are we?',
    },
    {
      component: 'Paragraph',
      index: 3,
      id: 'rh74-9h438fn3443',
      text: "The Pennsylvania Forestry Association is a broad-based citizen's organization that provides leadership and education in sound, science-based forest management and promotes stewardship to ensure the sustainability of all forest resources, resulting in benefits for all, today and into the future. The Champion Tree Program is one of the many resources we provide to achieve our goals. A champion tree represents the laregest of each species of tree found in the state. Finding, measuring and nominating big trees is an enjoyable outdoor hobby. Join us!",
    },
    {
      component: 'BlogSummary',
      id: 'r480h43fih3nfu43of34',
      index: 4,
    },
    {
      component: 'Header',
      index: 5,
      id: 'djklhgfiok4j5iu3h54t',
      alignment: 'center',
      text: 'Big Trees of Pennsylvania Register',
    },
    {
      component: 'Paragraph',
      index: 6,
      id: 'fwjkfhjhc444djddfhdsfhds',
      text: 'Thanks to all for your continued support of this program. We have over 1000 trees listed across the state that are big locally, or are the biggest in the state. You can submit trees for consideration for champion status to this website. In turn, trees that have National champion potential will be forwarded to American Forests.',
    },
    {
      component: 'Link',
      index: 7,
      className: 'right',
      text: 'americanforests.org',
      href: 'americanforests.org',
    },
    {
      component: 'Header',
      index: 8,
      alignment: 'center',
      id: 'fwjkfhjhc444djddfhds555s',
      text: 'Order Your register today!',
    },
    {
      component: 'Paragraph',
      index: 9,
      id: 'fwjkfhjhc444djdfffhds',
      // @TODO Please contact us should be a link
      text: 'The 2011 edition of our book is available through this website for just $15 delivered. Please contact us for bulk/wholesale prices.',
    },
    {
      component: 'Image',
      alt: 'Paypal',
      src: 'http://www.pabigtrees.com/images/paypal.gif',
      id: 'fwjkfh333jddfhdsfhds',
      className: 'center',
    },
  ],
}

router.get('/:pageName', (req, res, next) => {
  const { pageName } = req.params
  console.log({ pageName })
  res.json(samplePageData)
})

router.put('/:pageName', (req, res, next) => {
  // edit page
})

export default router

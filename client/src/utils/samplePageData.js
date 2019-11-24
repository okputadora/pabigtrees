export default {
  layout: 'TwoCol',
  column1: [0, 1, 2, 3],
  column2: [4, 5, 6, 7, 8, 9, 10],
  sections: [
    {
      component: 'Paragraph',
      index: 0,
      className: 'sampleClass',
      text: 'What literally covers the Commonwealth of Pennsylvania from A to Z? Trees! Trees of all kinds--from Abies to Ziziphus. Some of the largest of each species, are found here recorded on this website',
    },
    {
      component: 'Image',
      index: 1,
      className: 'center',
      src: 'http://www.pabigtrees.com/images/long_big_small1.jpg',
      alt: 'Longfellowpine',
      text: 'Longfellow Pine at Cook Forest State Park. This Eastern White Pine is the tallest tree in all of Northeastern United States at 184.7 feet tall, Clarion County',
    },
    {
      component: 'Header',
      index: 2,
      text: 'Who are we?',
    },
    {
      component: 'Paragraph',
      index: 3,
      text: "The Pennsylvania Forestry Association is a broad-based citizen's organization that provides leadership and education in sound, science-based forest management and promotes stewardship to ensure the sustainability of all forest resources, resulting in benefits for all, today and into the future. The Champion Tree Program is one of the many resources we provide to achieve our goals. A champion tree represents the laregest of each species of tree found in the state. Finding, measuring and nominating big trees is an enjoyable outdoor hobby. Join us!",
    },
    // {
    //   component: 'BlogSummary',
    //   index: 4,
    // },
    {
      component: 'Header',
      index: 5,
      className: 'center',
      text: 'Big Trees of Pennsylvania Register',
    },
    {
      component: 'Paragraph',
      index: 6,
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
      className: 'center',
      text: 'Order Your register today!',
    },
    {
      component: 'Paragraph',
      index: 9,
      // @TODO Please contact us should be a link
      text: 'The 2011 edition of our book is available through this website for just $15 delivered. Please contact us for bulk/wholesale prices.',
    },
    {
      component: 'Image',
      alt: 'Paypal',
      src: 'http://www.pabigtrees.com/images/paypal.gif',
      className: 'center',
    },
  ],
}

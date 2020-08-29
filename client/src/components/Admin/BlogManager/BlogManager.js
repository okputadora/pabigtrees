import React, { useEffect, useState, useCallback } from 'react'
import { Button } from '@blueprintjs/core'

import EntryForm from './EntryForm'
import { getNews, createNewsEntry } from '@/api/news'
import Entry from './Entry'

const BlogManager = () => {
  const [entries, setEntries] = useState([])

  const handleSubmit = useCallback((values, images) => {
    createNewsEntry({ ...values, images })
  }, [])

  const fetchNewsEntries = useCallback(async () => {
    const { data: { news, images } } = await getNews()
    const newsWithImages = news.map((newsEntry) => ({
      ...newsEntry,
      image: images[newsEntry.i_id] ? images[newsEntry.i_id].image_location : null,
    }))
    setEntries(newsWithImages)
  })
  useEffect(() => {
    fetchNewsEntries()
  }, [])

  return (
    <div className="news">
      <>
        <EntryForm handleSubmit={handleSubmit}>
          {({ setIsOpen }) => <Button onClick={() => setIsOpen(true)}>Create New Post</Button>}
        </EntryForm>
        {entries.map((entry) => (<Entry entry={entry} key={entry.i_id} onUpdate={fetchNewsEntries} />))}
      </>
    </div>
  )
}

export default BlogManager

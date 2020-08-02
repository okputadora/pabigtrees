import React, { useEffect, useState } from 'react'
import moment from 'moment'

import { getNews } from '@/api/news'

import './news.scss'

const News = () => {
  const [entries, setEntries] = useState([])

  useEffect(() => {
    (async () => {
      const { data: { news, images } } = await getNews()
      const newsWithImages = news.map((newsEntry) => ({
        ...newsEntry,
        image: images[newsEntry.i_id] ? images[newsEntry.i_id].image_location : null,
      }))
      setEntries(newsWithImages)
    })()
  }, [])

  return (
    <div className="news">
      {entries.map((entry) => (
        <div key={entry.i_id} className="news-entry">
          <div className="news-header">
            <div className="news-title">{entry.news_title}</div>
            <div className="news-date">{moment(entry.create_date).format('MMMM Do, YYYY')}</div>
          </div>
          {entry.image && <img className="news-image" key={entry.image} src={`http://localhost:4000/newsImages/${entry.image}`} alt={entry.image} />}
          <div className="news-body">{entry.news_body}</div>
        </div>
      ))}
    </div>
  )
}

export default News

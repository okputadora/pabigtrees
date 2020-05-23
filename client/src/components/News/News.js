import React, { useEffect, useState } from 'react'
import getNews from '@/api/news'

const News = () => {
  const [entries, setEntries] = useState([])
  useEffect(() => {
    (async () => {
      console.log('fetching news!')
      const { data: { news } } = await getNews()
      console.log({ news })
      setEntries(news)
    })()
  }, [])

  return (
    <div className="news">
      {entries.map((entry) => (
        <div key={entry.i_id} className="news-entry">
          <div className="news-title">{entry.news_title}</div>
          <div className="news-body">{entry.news_body}</div>
        </div>
      ))}
    </div>
  )
}

export default News

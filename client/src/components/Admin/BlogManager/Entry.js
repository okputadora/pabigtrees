import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import {
  Button, Intent, Alert,
} from '@blueprintjs/core'

import EntryForm from './EntryForm'
import { updateNewsEntry } from '@/api/news'
import BASE_URL from '@/config' // @TODO Properly configure this

const Entry = ({ entry, onUpdate }) => {
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false)

  const handleSubmit = useCallback(async (values) => {
    try {
      await updateNewsEntry({ ...values, i_id: entry.i_id })
      setIsConfirmingDelete(false)
      onUpdate()
    } catch (err) {
      alert(err)
    }
  }, [])
  return (
    <div className="news-entry">
      <Alert
        isOpen={isConfirmingDelete}
        intent={Intent.DANGER}
        icon="trash"
        confirmButtonText="Delete"
        cancelButtonText="Cancel"
        onConfirm={() => handleSubmit({ ...entry, isPublic: false })}
        onCancel={() => setIsConfirmingDelete(false)}
      >
        <p>Are you sure you want to delete this blog post?</p>
      </Alert>
      <div className="news-header">
        {entry.i_id}
        <div className="news-title">{entry.news_title}</div>
        <div className="news-date">{moment(entry.create_date).format('MMMM Do, YYYY')}</div>
      </div>
      {/* {entry.image && <img className="news-image" key={entry.image} src={`${BASE_URL}/newsImages/${entry.image}`} alt={entry.image} />} */}
      <div className="news-body">{entry.news_body}</div>
      <div className="row">
        <Button intent={Intent.DANGER} icon="trash" onClick={() => setIsConfirmingDelete(true)} />
        <EntryForm entry={entry} handleSubmit={handleSubmit}>
          {({ setIsOpen }) => <Button intent={Intent.PRIMARY} icon="edit" onClick={() => setIsOpen(true)} />}
        </EntryForm>
      </div>
    </div>
  )
}

Entry.propTypes = {
  entry: PropTypes.shape({
    i_id: PropTypes.number.isRequired,
    news_title: PropTypes.string.isRequired,
    create_date: PropTypes.string,
    image: PropTypes.string,
    news_body: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
}

export default Entry

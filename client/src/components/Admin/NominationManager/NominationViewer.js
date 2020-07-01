import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import { getNomination } from '@/api/nomination'
import NominationForm from './NominationForm'
import './nominationViewer.scss'

const NominationViewer = ({ match: { params: { id } } }) => {
  const [nomination, setNomination] = useState(null)
  useEffect(() => {
    const fetchNomination = async () => {
      try {
        const { data } = await getNomination(id)
        setNomination({ ...data.nomination, imagePaths: [...data.imagePaths], commonNameNew: data.nomination.speciesId ? null : data.nomination.commonName })
      } catch (err) {
        alert(err)
      }
    }
    fetchNomination()
  }, [])
  console.log({ nomination })
  return nomination ? (
    <div className="nominationViewer-container">
      <div className="nominationViewer-title">
        <NominationForm initValues={nomination} isAdminReview />
      </div>
    </div>
  ) : <div>loading</div>
}

NominationViewer.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
}

export default NominationViewer

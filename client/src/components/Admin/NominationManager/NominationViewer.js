import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import { getNomination } from '@/api/nomination'
import NominationForm from '@/components/Nomination/Nomination'
import './nominationViewer.scss'

const NominationViewer = ({ match: { params: { id } } }) => {
  const [nomination, setNomination] = useState(null)
  useEffect(() => {
    const fetchNomination = async () => {
      try {
        const { data: { nomination: dataNom } } = await getNomination(id)
        setNomination(dataNom)
      } catch (err) {
        alert(err)
      }
    }
    fetchNomination()
  }, [])
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

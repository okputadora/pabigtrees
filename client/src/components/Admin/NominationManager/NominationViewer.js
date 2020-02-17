import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import EditableText from '@/components/Common/EditableText'
import { getNomination } from '@/api/nomination'
import './nominationViewer.scss'

const NominationViewer = ({ match: { params: { id } } }) => {
  const [nomination, setNomination] = useState(null)
  useEffect(() => {
    const fetchNomination = async () => {
      try {
        const { data: { nomination: dataNom } } = await getNomination(id)
        setNomination(dataNom)
      } catch (err) {
        console.log(err)
        alert(err)
      }
    }
    fetchNomination()
  }, [])
  return nomination ? (
    <div className="nominationViewer-container">
      <div className="nominationViewer-title">
        <EditableText text={nomination.commonName} />
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

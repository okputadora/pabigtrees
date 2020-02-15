import React, { useEffect, useState } from 'react'
import { getNomination } from '@/api/nomination'

import './nominationViewer.scss'

const NominationViewer = ({ match: { params: { id } } }) => {
  const [nomination, setNomination] = useState([])
  useEffect(() => {
    console.log(id)
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
  return (
    <div className="nominationViewer-container">
      <div className="nominationViewer-title">{nomination.commonName}</div>
    </div>
  )
}

export default NominationViewer

import React, { useEffect, useState } from 'react'
import { getNominations } from '@/api/nomination'

import './nominationManager.scss'

const NominationPreview = ({
  commonName, species, genus, imagePath, nominator,
}) => (
    <div className="nominationPreview-container">
      <img className="nominationPreview-image" src={imagePath || ''} alt="preview" />
      <div className="nominationPreview-title">
        {commonName || species || genus}
      </div>
      <div className="nominationPreview-subtitle">
        {nominator}
      </div>
    </div>
  )

const NominationManager = () => {
  const [nominations, setNominations] = useState([])
  useEffect(() => {
    const fetchNominations = async () => {
      const { data: { nominations: dataNoms } } = await getNominations()
      setNominations(dataNoms)
    }
    fetchNominations()
  }, [])
  return (
    <div className="nominationManager-container">
      <h1 className="nominationManager-title">Nomination manager</h1>
      <div className="nominationManager-nominations">
        {nominations.map((nom) => <NominationPreview {...nom} />)}
      </div>
    </div>
  )
}

export default NominationManager

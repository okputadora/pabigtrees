import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getNominations } from '@/api/nomination'

import './nominationManager.scss'

const NominationPreview = ({
  commonName, species, genus, imagePaths, nominator, _id,
}) => {
  console.log(imagePaths)
  return (
    <Link to={`nomination/${_id}`}>
      <div className="nominationPreview-container">
        <img className="nominationPreview-image" src={imagePaths[0] ? `localhost:4000/uploads/${imagePaths[0]}` : ''} alt="preview" />
        <div className="nominationPreview-title">
          {commonName || species || genus}
        </div>
        <div className="nominationPreview-subtitle">
          {nominator}
        </div>
      </div>
    </Link>
  )
}


NominationPreview.propTypes = {

}

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

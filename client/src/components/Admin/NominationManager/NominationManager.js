import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { getNominations } from '@/api/nomination'

import './nominationManager.scss'

const NominationPreview = ({
  Species: {
    t_species: species,
    t_common: commonName,
  },
  Genus: {
    t_genus: genus,
  },
  imagePaths,
  nominator,
  id,
}) => {
  console.log(imagePaths)
  return (
    <Link to={`nomination/${id}`} key={id}>
      <div className="nominationPreview-container">
        <img className="nominationPreview-image" src={imagePaths[0] ? `http://localhost:4000/uploads/${imagePaths[0]}` : ''} alt="preview" />
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

NominationPreview.defaultProps = {
  commonName: null,
  species: null,
  Sp: null,
  imagePaths: [],
  nominator: null,
}

NominationPreview.propTypes = {
  commonName: PropTypes.string,
  species: PropTypes.string,
  genus: PropTypes.string,
  imagePaths: PropTypes.arrayOf(PropTypes.string),
  nominator: PropTypes.string,
  id: PropTypes.number.isRequired,
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
  console.log({ nominations })
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

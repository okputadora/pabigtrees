import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { getNominations } from '@/api/nomination'

import './nominationManager.scss'

const NominationPreview = ({
  Species,
  Genus,
  imagePaths,
  nominator,
  speciesId,
  genusId,
  id,
}) => (
  <Link to={`nomination/${id}?newSpecies=${!Species}&newGenus=${!Genus}`} key={id}>
    <div className="nominationPreview-container">
      <img className="nominationPreview-image" src={imagePaths[0] ? `http://localhost:4000/uploads/${imagePaths[0]}` : ''} alt="preview" />
      <div className="nominationPreview-title">
        {(Species || Genus) ? Species.t_common || Species.t_species || Genus.genus : speciesId || genusId }
      </div>
      <div className="nominationPreview-subtitle">
        {nominator}
      </div>
    </div>
  </Link>
)

NominationPreview.defaultProps = {
  Species: null,
  Genus: null,
  imagePaths: [],
  nominator: null,
}

NominationPreview.propTypes = {
  speciesId: PropTypes.string.isRequired,
  Species: PropTypes.shape({
    t_common: PropTypes.string,
    t_species: PropTypes.string,
  }),
  Genus: PropTypes.shape({
    genus: PropTypes.string,
  }),
  genusId: PropTypes.string.isRequired,
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
        {nominations.map((nom) => <NominationPreview key={nom.id} {...nom} />)}
      </div>
    </div>
  )
}

export default NominationManager

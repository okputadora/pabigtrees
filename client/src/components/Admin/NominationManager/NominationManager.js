import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { getNominations } from '@/api/nomination'
import { BASE_URL } from '@/config'

import './nominationManager.scss'

const NominationPreview = ({
  species,
  genus,
  imagePaths,
  nominator,
  speciesName,
  genusName,
  id,
}) => (
  <Link to={`nomination/${id}?newSpecies=${!species}&newGenus=${!genus}`} key={id}>
    <div className="nominationPreview-container">
      <img className="nominationPreview-image" src={imagePaths[0] ? `${BASE_URL}/uploads/${imagePaths[0]}` : ''} alt="preview" />
      <div className="nominationPreview-title">
        {(species || genus) ? species.t_common || species.t_species || genus.genus : speciesName || genusName }
      </div>
      <div className="nominationPreview-subtitle">
        {nominator}
      </div>
    </div>
  </Link>
)

NominationPreview.defaultProps = {
  species: null,
  genus: null,
  imagePaths: [],
  nominator: null,
  genusName: null,
  speciesName: null,
}

NominationPreview.propTypes = {
  speciesName: PropTypes.string,
  species: PropTypes.shape({
    t_common: PropTypes.string,
    t_species: PropTypes.string,
  }),
  genus: PropTypes.shape({
    genus: PropTypes.string,
  }),
  genusName: PropTypes.string,
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
  return (
    <div className="nominationManager-container">
      <h1 className="nominationManager-title">Nomination manager</h1>
      <div className="nominationManager-nominations">
        <h2>New Nominations</h2>
        {nominations.filter((nom) => !nom.isPending).map((nom) => <NominationPreview key={nom.id} {...nom} />)}
        <h2>Pending Nominations</h2>
        {nominations.filter((nom) => nom.isPending).map((nom) => <NominationPreview key={nom.id} {...nom} />)}
      </div>
    </div>
  )
}

export default NominationManager

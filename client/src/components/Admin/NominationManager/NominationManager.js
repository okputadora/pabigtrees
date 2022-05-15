import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Button } from '@blueprintjs/core'

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
}) => {
  console.log({ species })
  let sName = speciesName
  let gName = genusName
  if (species) {
    if (species.t_common) sName = species.t_common
    else if (species.t_species) sName = species.t_species
  } else if (genus) {
    gName = genus.genus
  }
  return (
    <Link to={`nomination/${id}?newSpecies=${!species}&newGenus=${!genus}`} key={id}>
      <div className="nominationPreview-container">
        <img className="nominationPreview-image" src={imagePaths[0] ? `${BASE_URL}/uploads/${imagePaths[0]}` : ''} alt="preview" />
        <div className="nominationPreview-title">
          {sName || gName }
        </div>
        <div className="nominationPreview-subtitle">
          {nominator}
        </div>
      </div>
    </Link>
  )
}

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
      // @TODO only fetch non approved nominations initially
      const { data: { nominations: dataNoms } } = await getNominations()
      setNominations(dataNoms)
    }
    fetchNominations()
  }, [])

  const [isShowingApprovedNominations, setIsShowingApprovedNominations] = useState(false)

  return (
    <div className="nominationManager-container">
      <h1 className="nominationManager-title">Nomination manager</h1>
      <div className="nominationManager-nominations">
        <h2>New Nominations</h2>
        {nominations.filter((nom) => !nom.isPending && !nom.isApproved).map((nom) => <NominationPreview key={nom.id} {...nom} />)}
        <h2>Pending Nominations</h2>
        {nominations.filter((nom) => nom.isPending).map((nom) => <NominationPreview key={nom.id} {...nom} />)}
        <h2>Approved Nominations</h2>
        <Button onClick={() => setIsShowingApprovedNominations(!isShowingApprovedNominations)}>
          {isShowingApprovedNominations ? 'Collapse Approved Nominations' : 'Expand Approved Nominations'}
        </Button>
        {isShowingApprovedNominations && (
          nominations.filter((nom) => nom.isApproved).map((nom) => <NominationPreview key={nom.id} {...nom} />)
        )}
      </div>
    </div>
  )
}

export default NominationManager

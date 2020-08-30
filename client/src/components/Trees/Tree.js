import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import { getTreeImages } from '@/api/tree'

const Tree = ({ tree }) => {
  const [treeImages, setTreeImages] = useState([])

  useEffect(() => {
    async function fetch() {
      try {
        const { data } = await getTreeImages(tree.id)
        if (data && data.length) {
          setTreeImages(data.map((treeImg) => treeImg.img_location))
        }
      } catch (e) {
        alert(e.message)
      }
    }
    fetch()
  }, [tree.id])


  return (
    <div className="tree-container">
      <div className="tree-header">
        <div className="species">{`${tree.genus}, ${tree.species}`}</div>
        <div>{`(${tree.commonName})`}</div>
      </div>
      <div className="sub-container">
        <div className="body">
          <div className="measurements">
            <div>{`Circumference (inches): ${tree.circumference}`}</div>
            <div>{`Spread (feet): ${tree.spread}`}</div>
            <div>{`Height (feet): ${tree.height}`}</div>
            <div>{`Points: ${tree.points}`}</div>
          </div>
          <div className="tree-data">
            <div>{`Address: ${tree.address}`}</div>
            <div>{`measuring Crew: ${tree.measuringCrew}`}</div>
            <div>{`Original Nominator: ${tree.originalNominator}`}</div>
            <div>{`Comments: ${tree.comments}`}</div>
            <div>{`Measuring Technique: ${tree.measuringTechnique}`}</div>
            <div>{`Year Nominated: ${moment(tree.yearNominated).format('YYYY')}`}</div>
            <div>{`Year Last Measured: ${moment(tree.yearLastMeasured).format('YYYY')}`}</div>
          </div>
          <div className="tree-images">
            {treeImages.length > 0 && treeImages.map((img) => (
              // @TODO make these urls dynamic for different environments
              <a href={`http://localhost:4000/treeImages/${img}`} target="_blank" rel="noopener noreferrer" key={img}>
                <img className="tree-images-previewImage" key={img} src={`http://localhost:4000/treeImages/${img}`} alt={img} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

Tree.propTypes = {
  tree: PropTypes.shape({
    county: PropTypes.string.isRequired,
    genus: PropTypes.string.isRequired,
    species: PropTypes.string.isRequired,
    commonName: PropTypes.string.isRequired,
    points: PropTypes.number.isRequired,
    address: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    circumference: PropTypes.number.isRequired,
    isMultiStemmed: PropTypes.bool.isRequired,
    spread: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    measuringCrew: PropTypes.string.isRequired,
    originalNominator: PropTypes.string.isRequired,
    comments: PropTypes.string.isRequired,
    measuringTechnique: PropTypes.string.isRequired,
    yearNominated: PropTypes.string.isRequired,
    yearLastMeasured: PropTypes.string.isRequired,
  }).isRequired,
}
export default Tree

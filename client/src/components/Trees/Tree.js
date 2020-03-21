import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

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
    <div>
      <div>Species</div>
      <div>Genus</div>
      <div>Common Name</div>
      <div className="tree-images">
        {treeImages.length > 0 && treeImages.map((img) => (
          <a href={`http://localhost:4000/treeImages/${img}`} target="_blank" rel="noopener noreferrer" key={img}>
            <img className="nomination-previewImage" key={img} src={`http://localhost:4000/treeImages/${img}`} alt={img} />
          </a>
        ))}
      </div>
    </div>
  )
}

Tree.propTypes = {
  tree: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
}
export default Tree

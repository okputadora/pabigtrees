import React, {
  useEffect,
  useState,
  useCallback,
  useRef,
} from 'react'
import PropTypes from 'prop-types'
import { Formik } from 'formik'

import * as API from '@/api/tree'
import ImageUpload from '@/components/ImageUpload'
import InputField from '@/components/Forms/InputField'
import Form from '@/components/Forms/Form'
import SpeciesManager from './SpeciesManager'
// import { formatAdminData } from '@/utils/format'

import './treeEditor.scss'

const TreeEditor = (props) => {
  const { match: { params: { id } } } = props
  const [editableTree, setTree] = useState(null)

  const fetchTree = useCallback(async () => {
    try {
      const { data: tree } = await API.getTreeForAdmin(id)
      // const formattedTree = formatAdminData(tree)
      setTree(tree)
    } catch (err) {
      alert(err)
    }
  }, [id])
  useEffect(() => {
    fetchTree()
  }, [id])

  const [treeImages, setTreeImages] = useState([])
  const filePaths = useRef(null)

  useEffect(() => {
    async function fetch() {
      try {
        const { data } = await API.getTreeImages(id)
        if (data && data.length) {
          setTreeImages(data.map((treeImg) => treeImg.img_location))
        }
      } catch (e) {
        alert(e.message)
      }
    }
    fetch()
  }, [id])

  const handleSubmit = useCallback(async (values) => {
    try {
      // eslint-disable-next-line no-param-reassign
      delete values.species
      await API.updateTree(id, values)
      await fetchTree()
    } catch (err) {
      alert(err)
    }
  }, [id])

  const removeImage = (e) => {
    console.log('removing ', e.target.id)
  }

  return (
    <div className="tree-editor">
      {editableTree && (
        <>
          <Formik
            onSubmit={handleSubmit}
            initialValues={editableTree}
            enableReinitialize
          >
            {({ handleSubmit: handleFormikSubmit, dirty, setFieldValue }) => (
              <Form>
                <SpeciesManager currentSpecies={editableTree.species} onSave={({ activeSpecies: { id: speciesId } }) => setFieldValue('k_species', speciesId)} />
                {Object.keys(editableTree).map((key) => <InputField key={key} name={key} labelProps={{ label: key }} />)}
                {dirty && <button type="submit" onClick={handleFormikSubmit} className="tree-editor-save-button">Save</button>}
              </Form>
            )}
          </Formik>
          <div className="tree-images">
            {treeImages.length > 0 && treeImages.map((img) => (
              <>
                <a href={`http://localhost:4000/treeImages/${img}`} target="_blank" rel="noopener noreferrer" key={img}>
                  <img className="tree-images-previewImage" key={img} src={`http://localhost:4000/treeImages/${img}`} alt={img} />
                </a>
                <button type="button" onClick={removeImage} id={img}>remove this image</button>
              </>
            ))}
          </div>
          <ImageUpload upload={API.uploadImages} onUpload={(files) => console.log('save file paths to tree', files)} />
        </>
      )}
    </div>
  )
}

TreeEditor.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
}

export default TreeEditor

/* eslint-disable no-param-reassign */
import React, {
  useEffect,
  useState,
  useCallback,
} from 'react'
import PropTypes from 'prop-types'
import { Formik } from 'formik'
import omit from 'lodash/omit'

import * as API from '@/api/tree'
import { addSpecies, addSpeciesAndGenus } from '@/api/classification'
import ImageUpload from '@/components/ImageUpload'
import InputField from '@/components/Forms/InputField'
import Form from '@/components/Forms/Form'
import SpeciesManager from './SpeciesManager'
import SelectField from '@/components/Forms/SelectField'
import { counties } from '@/utils/nomination'
import { BASE_URL } from '@/config'
// import { formatAdminData } from '@/utils/format'

import './treeEditor.scss'

const readOnlyFields = ['points', 'id', 'k_species', 'd_added']

const TreeEditor = (props) => {
  const { match: { params: { id } } } = props
  const [editableTree, setTree] = useState(null)

  const fetchTree = useCallback(async () => {
    try {
      const { data: tree } = await API.getTreeForAdmin(id)
      setTree(omit(tree, readOnlyFields))
    } catch (err) {
      alert(err)
    }
  }, [id])
  useEffect(() => {
    fetchTree()
  }, [id])

  const [treeImages, setTreeImages] = useState([])

  const fetchImages = useCallback(async () => {
    try {
      const { data } = await API.getTreeImages(id)
      if (data && data.length) {
        setTreeImages(data)
      }
    } catch (e) {
      alert(e.message)
    }
  }, [id])
  useEffect(() => {
    fetchImages()
  }, [id])

  const handleSubmit = useCallback(async (values) => {
    try {
      // use omit here
      delete values.species
      delete values.county
      await API.updateTree(id, { ...values })
      await fetchTree()
    } catch (err) {
      alert(err)
    }
  }, [id])

  const removeImage = useCallback(async (imageId) => {
    try {
      await API.removeImage(imageId)
      await fetchImages()
    } catch (err) {
      alert(err)
    }
  })

  const handleSpeciesSave = async (vals, setFieldValue) => {
    const {
      activeSpecies: {
        id: speciesId,
        name: speciesName,
      },
      activeGenus: {
        id: genusId,
        name: genusName,
      },
      activeCommonName: {
        name: commonNameName,
      },
    } = vals
    if (speciesId === 'NEW') {
      if (genusId === 'NEW') {
        const { data: { createdSpecies } } = await addSpeciesAndGenus(speciesName, genusName, commonNameName)
        setFieldValue('k_species', createdSpecies.id)
      } else {
        const { data: { createdSpecies } } = await addSpecies(speciesName, genusId, commonNameName)
        setFieldValue('k_species', createdSpecies.id)
      }
      // setFieldTouched('k_species')
      // create new species
    }
    setFieldValue('k_species', speciesId)
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
            {({
              handleSubmit: handleFormikSubmit, dirty, setFieldValue,
            }) => (
              <Form>
                <SpeciesManager
                  currentSpecies={editableTree.species}
                  onSave={(vals) => handleSpeciesSave(vals, setFieldValue, setFieldValue)}
                />
                {Object.keys(editableTree).map((key) => {
                  if (key === 'k_county') {
                    return (
                      <SelectField
                        key={key}
                        name="k_county"
                        items={counties}
                        activeItem={editableTree[key] ? counties.filter((c) => c.id === editableTree[key])[0] : null}
                        labelProps={{ label: 'k_county' }}
                      />
                    )
                  } return <InputField key={key} name={key} labelProps={{ label: key }} />
                })}
                {dirty && <button type="submit" onClick={handleFormikSubmit} className="tree-editor-save-button">Save</button>}
              </Form>
            )}
          </Formik>
          <div className="tree-images">
            {treeImages.length > 0 && treeImages.map((img) => (
              <div className="tree-images-previewImage">
                <a href={`${BASE_URL}/treeImages/${img.img_location}`} target="_blank" rel="noopener noreferrer" key={img.img_location}>
                  <img src={`${BASE_URL}/treeImages/${img.img_location}`} alt={img.img_location} />
                </a>
                <button type="button" onClick={() => removeImage(img.id)} id={img}>remove this image</button>
              </div>
            ))}
          </div>
          <ImageUpload upload={(files) => API.uploadImages(files, id)} onUpload={fetchImages} resetOnUpload />
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

import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Formik } from 'formik'

import * as API from '@/api/tree'
import ImageUpload from '@/components/ImageUpload'
import InputField from '@/components/Forms/InputField'
import Form from '@/components/Forms/Form'
import { formatAdminData } from '@/utils/format'
import './treeEditor.scss'

const TreeEditor = (props) => {
  const { match: { params: { id } } } = props
  const [editableTree, setTree] = useState(null)
  useEffect(() => {
    const fetchTree = async () => {
      try {
        const { data: tree } = await API.getTreeForAdmin(id)
        const formattedTree = formatAdminData(tree)
        setTree(formattedTree)
      } catch (e) {
        console.log(e)
      }
    }
    fetchTree()
  }, [id])

  const [treeImages, setTreeImages] = useState([])
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

  const handleSubmit = (values) => {
    console.log(values)
  }

  const removeImage = (e) => {
    console.log('removing ', e.target.id)
  }
  return (
    <div>
      {editableTree && (
        <>
          <Formik
            onSubmit={handleSubmit}
            initialValues={editableTree}
          >
            {({ handleSubmit: handleFormikSubmit, dirty }) => (
              <Form>
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
          <ImageUpload />
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

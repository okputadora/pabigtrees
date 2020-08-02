import React, {
  useCallback, useState, useEffect, useMemo,
} from 'react'
import PropTypes from 'prop-types'
import { useParams, useHistory, useLocation } from 'react-router-dom'
import { Formik, useFormikContext } from 'formik'
import { useDropzone } from 'react-dropzone'
import { Checkbox } from '@blueprintjs/core'
import classNames from 'classnames'
import * as Yup from 'yup'

import Form from '@/components/Forms/Form'
import {
  nominateTree, uploadFiles, confirmNomination, removeImage,
} from '@/api/nomination'

import { getSpeciesAndGenera } from '@/api/tree'
import InputField from '@/components/Forms/InputField'
import SelectField from '@/components/Forms/SelectField'
import { initialValues } from './formData'
import { counties, measuringTechniques } from '@/utils/nomination'
import Header from '@/components/Common/Header'

import './nomination.scss'

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const nominationSchema = Yup.object().shape({
  commonName: Yup.string().required(),
  genus: Yup.string().required(),
  species: Yup.string().required(),
  county: Yup.number().required(),
  nominator: Yup.string().required(),
  address: Yup.string().required(),
  phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid'),
  email: Yup.string().email(),
  locationOfTree: Yup.string(),
  lat: Yup.number(),
  lon: Yup.number(),
  measuringCrew: Yup.string().required(),
  measuringTechnique: Yup.string().required(),
  dateMeasured: Yup.string().required(),
  landOwner: Yup.string(),
  ownerAddress: Yup.string(),
  ownerPhone: Yup.string(),
  ownerEmail: Yup.string(),
  circumference: Yup.number().required(),
  height: Yup.number().required(),
  spread1: Yup.number().required(),
  spread2: Yup.number().required(),
  comments: Yup.string(),
  isPublic: Yup.bool(),
})

const calculatePoints = (c, h, s1, s2) => {
  if (c && h && s1 && s2) {
    try {
      const cInt = parseInt(c, 10)
      const hInt = parseInt(h, 10)
      const s1Int = parseInt(s1, 10)
      const s2Int = parseInt(s2, 10)

      return cInt + hInt + ((s1Int + s2Int) / 8)
    } catch (e) {
      return 'Error calculating'
    }
  } else {
    return 'Enter Circumference, height, and both spread values to calculate points'
  }
}

const AdminReview = () => {
  const { values } = useFormikContext()
  const params = useParams()
  const history = useHistory()
  const [isPublic, setIsPublic] = useState(false)
  const handleSubmit = useCallback(async () => {
    try {
      await confirmNomination(params.id, { ...values, isPublic, isApproved: true })
      history.push('/admin/confirmation')
    } catch (e) {
      alert('something went wrong!')
    }
  }, [values, isPublic, params])
  const deleteImage = useCallback(async (imagePath) => {
    const shouldDelete = window.confirm('Are you sure you want to remove this image? This action cannot be undone, the image will be lost forever')
    if (shouldDelete) {
      try {
        await removeImage(imagePath)
      } catch (e) {
        alert('something went wrong!')
      }
    }
  }, [])
  return (
    <>
      <div className="nomination-checkbox"><Checkbox labelElement={<span className="white">public</span>} checked={isPublic} onChange={() => setIsPublic(!isPublic)} /></div>
      <div className="nomination-review-previewImages">
        {values.imagePaths.map((img) => (
          <div className="nomination-previewContainer" key={img.id}>
            <a href={`http://localhost:4000/uploads/${img.location}`} target="_blank" rel="noopener noreferrer">
              <img className="nomination-previewImage" key={img} src={`http://localhost:4000/uploads/${img.location}`} alt="preview" />
            </a>
            <button type="button" className="nomination-deleteImage" onClick={deleteImage}>X</button>
          </div>
        ))}
      </div>
      <button className="nomination-submit" type="button" onClick={handleSubmit}>Approve Nomination</button>
    </>
  )
}

const UserNomination = ({ images, setImages }) => {
  const [isUploading, setUploading] = useState(false)
  const { submitForm } = useFormikContext()
  const handleDrop = useCallback(async (files, rejectedFiles) => {
    if (rejectedFiles.length > 0) {
      alert('some files were rejected')
    }
    if (files) {
      if (files.length > 5) {
        alert('You\'re attempting to upload too many files. The limit is 5')
      }
      try {
        setUploading(true)
        const { data: uploadedFiles } = await uploadFiles(files)
        setImages(images.concat(files.map((file, i) => Object.assign(file, {
          preview: URL.createObjectURL(file),
          imagePath: uploadedFiles[i],
        }))))
      } catch (err) {
        alert(err.message)
      } finally {
        setUploading(false)
      }
    }
  }, [images])

  const {
    getRootProps,
    getInputProps,
    isDragActive,
  } = useDropzone({ onDrop: handleDrop, accept: 'image/*' })
  const fileDropClasses = classNames({
    'nomination-fileDrop': true,
    'fileDrop-active': isDragActive,
  })
  return (
    <>
      <div className={fileDropClasses} {...getRootProps()}>
        {isUploading && (
          <div className="loading">
            <div className="loader">Loading...</div>
          </div>
        )}
        {images.length > 0 && (
          <div className="nomination-previewImages">
            {images.map((img) => <img className="nomination-previewImage" key={img.preview} src={img.preview} alt="preview" />)}
          </div>
        )}
        <input {...getInputProps()} />
        {
          isDragActive
            ? <p>Drop the images here ...</p>
            : <p>Drag up to 5 images here, or click to select from your file system</p>
        }
      </div>
      <button className="nomination-submit" type="button" onClick={submitForm}>submit</button>
    </>
  )
}

const Nomination = ({ initValues, isAdminReview }) => {
  const [images, setImages] = useState([])
  const [{ species, genera, commonNames }, setTreeLists] = useState({})
  const [{ filteredSpecies, filteredCommonNames }, setFilteredTreeLists] = useState({})
  const [activeSpecies, setActiveSpecies] = useState({})
  const [activeGenus, setActiveGenus] = useState({})
  const [activeCommonName, setActiveCommonName] = useState({})
  const [isNew, setIsNew] = useState({ commonName: false, species: false, genus: false })
  const location = useLocation()

  const { newSpecies, newGenus } = useMemo(() => {
    const query = new URLSearchParams(location.search)
    const speciesQuery = query.get('newSpecies')
    const genusQuery = query.get('newGenus')
    return { newSpecies: speciesQuery === 'true', newGenus: genusQuery === 'true' }
  }, [location.search])

  useEffect(() => {
    (async () => {
      const { data: { species: speciesList, genera: generaList, commonNames: commonList } } = await getSpeciesAndGenera()
      if (newSpecies) {
        speciesList.unshift({ name: initValues.speciesId, id: 'NEW' })
      }
      setTreeLists({ species: speciesList, genera: generaList, commonNames: commonList })
      setFilteredTreeLists({ filteredSpecies: speciesList, filteredCommonNames: commonList })
    })()
  }, [newSpecies, newGenus, initValues])

  const handleSelect = useCallback((itemType) => (itemSelected) => {
    if (itemSelected.id === 'NEW') {
      setIsNew({ ...isNew, [itemType]: true })
    }
    if ((!itemSelected.id || itemSelected.id === 'NEW')) {
      setFilteredTreeLists({
        filteredSpecies: species,
        filteredCommonNames: commonNames,
      })
      return
    }
    if (itemType === 'commonName') {
      const newActiveSpecies = species.filter((s) => s.id === itemSelected.id)[0]
      const newActiveGenus = genera.filter((g) => g.id === itemSelected.genusId)[0]
      setActiveSpecies(newActiveSpecies)
      setActiveGenus(newActiveGenus)
      setActiveCommonName(itemSelected)
    } else if (itemType === 'genus') {
      setFilteredTreeLists({
        filteredSpecies: species.filter((s) => s.genusId === itemSelected.id),
        filteredCommonNames: commonNames.filter((c) => c.genusId === itemSelected.id),
      })
      if (activeSpecies.id) {
        setActiveSpecies({})
      }
      if (activeCommonName.id) {
        setActiveCommonName({})
      }
      setActiveGenus(itemSelected)
    } else if (itemType === 'species') {
      const newActiveCommonName = commonNames.filter((s) => s.id === itemSelected.id)[0]
      const newActiveGenus = genera.filter((g) => g.id === itemSelected.genusId)[0]
      setActiveSpecies(itemSelected)
      setActiveGenus(newActiveGenus)
      setActiveCommonName(newActiveCommonName)
    }
  }, [species, genera, commonNames, isNew, activeSpecies, activeCommonName])

  useEffect(() => {
    if (initValues && isAdminReview && species) {
      let newActiveSpecies
      if (newSpecies) {
        [newActiveSpecies] = species.filter((s) => s.id === 'NEW')
      } else {
        [newActiveSpecies] = species.filter((s) => s.id === initValues.speciesId)
      }
      handleSelect('species')(newActiveSpecies)
    }
  }, [initValues, isAdminReview, species, newSpecies, newGenus])

  const history = useHistory()

  const handleSubmit = useCallback(async (values) => {
    try {
      const formValues = { ...values, imagePaths: images.map((img) => img.imagePath) }
      await nominateTree({ ...formValues, isNew })
      alert('Your nomination has been submitted!')
      history.push('/confirmation')
    } catch (err) {
      alert(err)
    }
  }, [images, isNew])

  // const SpeciesField = isAdminReview && newSpecies ? InputField : SelectField

  return (
    <div className="nomination-pageContainer">
      {!isAdminReview && (
      <div className="nomination-title">
        <Header text="Tree Nomination Form" />
        <p className="nomination-prompt">Your help is needed to locate, document, and preserve outstanding trees in Pennsylvania. If you know of a potential Champion Tree, please bring it to our attention using use our nomination form below.</p>
      </div>
      )}
      <div className="nomination-container">
        <Formik
          validationSchema={nominationSchema}
          onSubmit={handleSubmit}
          initialValues={initValues}
        >
          {({ values }) => (
            <Form>
              {filteredCommonNames && (
                <SelectField
                  items={filteredCommonNames}
                  canAdd
                  handleSelect={handleSelect('commonName')}
                  activeItem={activeCommonName}
                  name="commonName"
                  labelProps={{ label: 'Common Name*' }}
                />
              )}
              {genera && (
                <SelectField
                  name="genus"
                  canAdd
                  handleSelect={handleSelect('genus')}
                  activeItem={activeGenus}
                  items={genera}
                  labelProps={{ label: 'Genus*' }}
                />
              )}
              {filteredSpecies && (
                <SelectField
                  name="species"
                  canAdd
                  handleSelect={handleSelect('species')}
                  activeItem={activeSpecies}
                  items={filteredSpecies}
                  labelProps={{ label: 'Species*' }}
                />
              )}
              <SelectField
                name="county"
                items={counties}
                activeItem={initValues ? counties.filter((c) => c.id.toString() === initValues.county.toString())[0] : null}
                labelProps={{ label: 'County*' }}
              />
              <InputField
                name="nominator"
                labelProps={{ label: 'Nominator*' }}
              />
              <InputField
                name="address"
                labelProps={{ label: 'Address*' }}
              />
              <InputField
                name="phone"
                labelProps={{ label: 'Phone' }}
              />
              <InputField
                name="email"
                labelProps={{ label: 'Email*' }}
              />
              <InputField
                name="landOwner"
                labelProps={{ label: 'Land Owner' }}
              />
              <InputField
                name="ownerAddress"
                labelProps={{ label: 'Owner Address (if different)' }}
              />
              <InputField
                name="ownerPhone"
                labelProps={{ label: 'Owner Phone (if different)' }}
              />
              <InputField
                name="ownerEmail"
                labelProps={{ label: 'Owner Email (if different)' }}
              />
              <InputField
                name="locationOfTree"
                labelProps={{ label: 'Location of tree' }}
              />
              <InputField
                name="lon"
                labelProps={{ label: 'longitude' }}
              />
              <InputField
                name="lat"
                labelProps={{ label: 'latitude' }}
              />
              <InputField
                name="measuringCrew"
                labelProps={{ label: 'Measuring Crew*' }}
              />
              <SelectField
                name="measuringTechnique"
                items={measuringTechniques}
                activeItem={initValues ? measuringTechniques.filter((c) => c.id.toString() === initValues.measuringTechnique)[0] : null}
                labelProps={{ label: 'Measuring Technique*' }}
              />
              <InputField
                name="dateMeasured"
                labelProps={{ label: 'Date Measured*' }}
              />
              <div className="form-divider" />
              <InputField
                name="circumference"
                labelProps={{ label: 'Circumference (inches)*' }}
              />
              <InputField
                name="height"
                labelProps={{ label: 'Height (feet)*' }}
              />
              <InputField
                name="spread1"
                labelProps={{ label: 'Spread (first measurement, feet)*' }}
              />
              <InputField
                name="spread2"
                labelProps={{ label: 'Spread (second measurement, feet)*' }}
              />
              <div className="points-calculation">
                <span className="points-label">Points: </span>
                <span className="points-value">{calculatePoints(values.circumference, values.height, values.spread1, values.spread2)}</span>
              </div>
              <div className="form-divider" />
              <InputField
                name="comments"
                labelProps={{ label: 'Comments' }}
              />
              {isAdminReview ? <AdminReview images={images} setImages={setImages} /> : <UserNomination images={images} setImages={setImages} />}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

UserNomination.defaultProps = {
  images: [],
}

UserNomination.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string),
  setImages: PropTypes.func.isRequired,
}

Nomination.defaultProps = {
  initValues: initialValues,
  isAdminReview: false,
}

Nomination.propTypes = {
  initValues: PropTypes.shape({}),
  isAdminReview: PropTypes.bool,
}

export default Nomination

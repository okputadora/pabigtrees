import React, { useState, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import { Formik } from 'formik'
import { Dialog, Button } from '@blueprintjs/core'
import SelectField from '@/components/Forms/SelectField'

import { getSpeciesAndGenera } from '@/api/tree' // consider moving to classification API

const SpeciesManager = ({
  currentSpecies,
  title = 'Species Manager',
  onSave,
}) => {
  const [isCreatingNewSpecies, setIsCreatingNewSpecies] = useState(false)
  const [{ species, genera, commonNames }, setTreeLists] = useState({})
  const [activeSpecies, setActiveSpecies] = useState({ name: currentSpecies.t_species, id: currentSpecies.id })
  const [activeGenus, setActiveGenus] = useState({ name: currentSpecies.genus.t_genus, id: currentSpecies.genus.id })
  const [activeCommonName, setActiveCommonName] = useState({ name: currentSpecies.t_common, id: currentSpecies.id })


  const [{ filteredSpecies, filteredCommonNames }, setFilteredTreeLists] = useState({})
  const fetchLists = useCallback(async () => {
    try {
      const { data: { species: speciesList, genera: generaList, commonNames: commonList } } = await getSpeciesAndGenera()
      setTreeLists({ species: speciesList, genera: generaList, commonNames: commonList })
      setFilteredTreeLists({ filteredSpecies: speciesList, filteredCommonNames: commonList })
    } catch (err) {
      alert(err)
    }
  }, [])

  useEffect(() => {
    fetchLists()
  }, [])

  const handleSelect = useCallback((itemType) => (itemSelected) => {
    if (itemSelected.id === 'NEW') {
      if (itemType === 'commonName') {
        setActiveCommonName(itemSelected)
      } else if (itemType === 'genus') {
        setActiveGenus(itemSelected)
      } else {
        setActiveSpecies(itemSelected)
      }
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
  }, [species, genera, commonNames, activeSpecies, activeCommonName])

  return (
    <>
      <Button onClick={() => setIsCreatingNewSpecies(true)}>Change Species and/or Genus</Button>
      <Dialog
        isOpen={isCreatingNewSpecies}
        onClose={() => setIsCreatingNewSpecies(false)}
        title={title}
      >
        <Formik // @TODO consider not using formik here
          initialValues={{ species: '', genus: '' }}
        >
          <div style={{ padding: 20 }}>
            {filteredCommonNames && (
              <SelectField
                items={filteredCommonNames}
                canAdd
                handleSelect={handleSelect('commonName')}
                activeItem={activeCommonName}
                name="commonName"
                labelProps={{ label: 'Common Name' }}
              />
            )}
            {genera && (
              <SelectField
                name="genus"
                canAdd
                handleSelect={handleSelect('genus')}
                activeItem={activeGenus}
                items={genera}
                labelProps={{ label: 'Genus' }}
              />
            )}
            {filteredSpecies && (
              <SelectField
                name="species"
                canAdd
                handleSelect={handleSelect('species')}
                activeItem={activeSpecies}
                items={filteredSpecies}
                labelProps={{ label: 'Species' }}
              />
            )}
            <Button
              style={{ marginTop: 20, width: '100%' }}
              onClick={() => {
                onSave({ activeSpecies, activeGenus, activeCommonName })
                setIsCreatingNewSpecies(false)
              }}
            >
              Save
            </Button>
          </div>
        </Formik>
      </Dialog>
    </>
  )
}

SpeciesManager.propTypes = {
  currentSpecies: PropTypes.shape({
    genus: PropTypes.shape({
      t_genus: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    }),
    t_species: PropTypes.string.isRequired,
    t_common: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
  title: PropTypes.string,
  onSave: PropTypes.func.isRequired,
}

export default SpeciesManager

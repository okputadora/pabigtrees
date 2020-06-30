const keyMap = {
  genus: 'k_genus',
  species: 'k_species',
  points: 'i_points',
  county: 'k_county',
  // 'Common Name', 'Address',
}

export const formatTreeData = (data) => {
  const formattedData = data.map((d) => {
    const formattedRow = {}
    Object.keys(d).forEach((key) => {
      if (keyMap[key]) {
        formattedRow[keyMap[key]] = d[key]
      }
    })
    return d
  })
  return formattedData = {
    columns: ['Genus', 'Species', 'Points', 'County', 'Common Name', 'Address'],
  }
}

const formatTableData = (rawData) => rawData.map((row) => (
  {
    county: row.county ? row.County.county : null,
    genus: row.species && row.Species.Genus && row.Species.Genus.t_genus,
    species: row.species && row.Species.t_species,
    commonName: row.species && row.Species.t_common,
    points: row.i_points,
    address: row.t_address,
    id: row.id,
  }
))

export const formatData = (rawData) => rawData.map((tree) => (
  {
    county: tree.county ? tree.county.county : null,
    genus: tree.species && tree.species.genus && tree.species.genus.t_genus,
    species: tree.species && tree.species.t_species,
    commonName: tree.species && tree.species.t_common,
    points: tree.i_points,
    address: tree.t_address,
    id: tree.id,
    circumference: tree.i_circum_inchs,
    isMultiStemmed: tree.f_multistemmed === 1,
    spread: tree.i_spread_feet,
    height: tree.i_height_feet,
    measuringCrew: tree.t_measuring_crew,
    originalNominator: tree.t_original_nominator,
    comments: tree.t_comments,
    measuringTechnique: tree.k_technique,
    yearNominated: tree.d_nominated,
    yearLastMeasured: tree.d_last_measured,
  }
))

export const formatAdminData = (tree) => (
  {
    county: tree.county ? tree.county.county : null,
    genus: tree.species && tree.species.genus && tree.species.genus.t_genus,
    species: tree.species && tree.species.t_species,
    commonName: tree.species && tree.species.t_common,
    points: tree.i_points,
    address: tree.t_address,
    id: tree.id,
    circumference: tree.i_circum_inchs,
    isMultiStemmed: tree.f_multistemmed === 1,
    spread: tree.i_spread_feet,
    height: tree.i_height_feet,
    measuringCrew: tree.t_measuring_crew,
    originalNominator: tree.t_original_nominator,
    comments: tree.t_comments,
    measuringTechnique: tree.k_technique,
    yearNominated: tree.d_nominated,
    yearLastMeasured: tree.d_last_measured,
    isNationalChamp: tree.f_nationalChamp === 1,
    isRetired: tree.f_retired === 1,
    isPennCharter: tree.f_penn_charter === 1,
    isTallest: tree.f_tallest === 1,
  }
)

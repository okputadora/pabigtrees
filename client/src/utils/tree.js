export const formatData = (rawData) => rawData.map((tree) => ({
  county: tree.county ? tree.county.county : '',
  genus: tree.species && tree.species.genus && tree.species.genus.t_genus,
  species: tree.species && tree.species.t_species,
  commonName: tree.species && tree.species.t_common,
  points: tree.i_points,
  address: tree.t_address || '',
  id: tree.id,
  circumference: tree.i_circum_inches,
  isMultiStemmed: tree.f_multistemmed === 1,
  spread: tree.i_spread_feet,
  height: tree.i_height_feet,
  measuringCrew: tree.t_measure_crew || '',
  originalNominator: tree.t_original_nominator || '',
  gps: tree.t_gps || 'N/A ',
  comments: tree.t_comments || '',
  measuringTechnique: tree.k_technique,
  yearNominated: tree.d_nominated,
  yearLastMeasured: tree.d_last_measured,
}))

export default {}

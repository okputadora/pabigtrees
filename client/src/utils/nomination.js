import * as Yup from 'yup'

export const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

export const nominationSchema = Yup.object().shape({
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

export const calculatePoints = (c, h, s1, s2) => {
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

export const counties = [
  { id: 1, name: 'Adams' },
  { id: 2, name: 'Allegheny' },
  { id: 3, name: 'Armstrong' },
  { id: 4, name: 'Beaver' },
  { id: 5, name: 'Bedford' },
  { id: 6, name: 'Berks' },
  { id: 7, name: 'Blair' },
  { id: 8, name: 'Bradford' },
  { id: 9, name: 'Bucks' },
  { id: 10, name: 'Butler' },
  { id: 11, name: 'Cambria' },
  { id: 12, name: 'Cameron' },
  { id: 13, name: 'Carbon' },
  { id: 14, name: 'Centre' },
  { id: 15, name: 'Chester' },
  { id: 16, name: 'Clarion' },
  { id: 17, name: 'Clearfield' },
  { id: 18, name: 'Clinton' },
  { id: 19, name: 'Columbia' },
  { id: 20, name: 'Crawford' },
  { id: 21, name: 'Cumberland' },
  { id: 22, name: 'Dauphin' },
  { id: 23, name: 'Delaware' },
  { id: 24, name: 'Elk' },
  { id: 25, name: 'Erie' },
  { id: 26, name: 'Fayette' },
  { id: 27, name: 'Forest' },
  { id: 28, name: 'Franklin' },
  { id: 29, name: 'Fulton' },
  { id: 30, name: 'Greene' },
  { id: 31, name: 'Huntingdon' },
  { id: 32, name: 'Indiana' },
  { id: 33, name: 'Jefferson' },
  { id: 34, name: 'Juniata' },
  { id: 35, name: 'Lackawanna' },
  { id: 36, name: 'Lancaster' },
  { id: 37, name: 'Lawrence' },
  { id: 38, name: 'Lebanon' },
  { id: 39, name: 'Lehigh' },
  { id: 40, name: 'Luzerne' },
  { id: 41, name: 'Lycoming' },
  { id: 42, name: 'McKean' },
  { id: 43, name: 'Mercer' },
  { id: 44, name: 'Mifflin' },
  { id: 45, name: 'Monroe' },
  { id: 46, name: 'Montgomery' },
  { id: 47, name: 'Montour' },
  { id: 48, name: 'Northampton' },
  { id: 49, name: 'Northumberland' },
  { id: 50, name: 'Perry' },
  { id: 51, name: 'Philadelphia ' },
  { id: 52, name: 'Pike' },
  { id: 53, name: 'Potter' },
  { id: 54, name: 'Schuylkill' },
  { id: 55, name: 'Snyder' },
  { id: 56, name: 'Somerset' },
  { id: 57, name: 'Sullivan' },
  { id: 58, name: 'Susquehanna' },
  { id: 59, name: 'Tioga' },
  { id: 60, name: 'Union' },
  { id: 61, name: 'Venango' },
  { id: 62, name: 'Warren' },
  { id: 63, name: 'Washington' },
  { id: 64, name: 'Wayne' },
  { id: 65, name: 'Westmoreland' },
  { id: 66, name: 'Wyoming' },
  { id: 67, name: 'York' },
]

export const measuringTechniques = [
  { id: 1, name: 'ENTS' },
  { id: 2, name: 'UNK' },
  { id: 3, name: 'CLIN@100' },
  { id: 4, name: 'Abney' },
  { id: 5, name: 'Estimate' },
  { id: 6, name: 'Other' },
]

export const formatInitialValues = (values) => {
  const formattedValues = {}
  Object.keys(values).forEach((key) => { formattedValues[key] = values[key] || '' })
  return formattedValues
}

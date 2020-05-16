import Joi from '@hapi/joi'
import jwt from 'jsonwebtoken'

import { IN_PROD, SECRET } from './config'

export const validateRequest = (schema) => (req, res, next) => {
  const joiSchema = Joi.object(schema)
  const validated = joiSchema.validate(req.body)
  if (validated) return next()
  throw new Error('Schema is not valid')
}

export const issueToken = (user, res) => {
  const payload = user.authSummary()
  const token = jwt.sign(payload, SECRET, {
    expiresIn: '2d',
  })
  res.cookie('user', token, {
    httpOnly: true,
    secure: IN_PROD,
    maxAge: 1000 * 60 * 60 * 24 * 2,
  })
}

export const keyMap = {
  genus: 'k_genus',
  species: 't_species',
  points: 'i_points',
  county: 'k_county',
  commonName: 't_common',
  address: 't_address',
  // 'Common Name', 'Address',
}

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

export const mapNominationToTree = (nomination, newSpecies) => ({
  species: newSpecies.id || nomination.speciesId, // Look up species code from species table might need nomination.genera to do this too
  k_county: nomination.county, // nomination.county @TODO need to lookup county code first,
  k_technique: nomination.measuringTechnique,
  d_nominated: nomination.createdAt && nomination.createdAt.toString(),
  d_last_measured: nomination.dateMeasured,
  i_circum_inchs: nomination.circumference ? parseInt(nomination.circumference, 10) : null,
  i_height_feet: nomination.height ? parseInt(nomination.height, 10) : null,
  i_spread_feet: (parseInt(nomination.spread1, 10) + parseInt(nomination.spread2, 10)) / 2,
  i_points: calculatePoints(nomination.circumference, nomination.height, nomination.spread1, nomination.spread2),
  t_address: nomination.address,
  t_gps: nomination.lon && nomination.lat ? `${nomination.lon}, ${nomination.lat}` : null,
  t_measure_crew: nomination.measuringCrew,
  t_original_nominator: nomination.nominator,
  t_comments: nomination.comments,
  f_national_champ: null, // @TODO ask aaron, should these fields be part of approval form
  f_retired: null, // @TODO ,
  f_penn_charter: null,
  f_multistemmed: null,
  f_tallest: null,
  k_user_added: null, // @ Todo whats this?
  d_added: Date.now(),
  isPublic: nomination.isPublic ? 1 : 0,
  isTest: 1,
})

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const baseSchema = Joi.object({
  commonName: Joi.string().required(),
  genus: Joi.string().required(),
  species: Joi.string().required(),
  county: Joi.number().required(),
  nominator: Joi.string().required(),
  address: Joi.string().required(),
  phone: Joi.string().allow(''),
  email: Joi.string().email().required(),
  locationOfTree: Joi.string().allow(''),
  lat: Joi.number().empty(''),
  lon: Joi.number().empty(''),
  measuringCrew: Joi.string().required(),
  measuringTechnique: Joi.number().required(),
  dateMeasured: Joi.string().required(),
  landOwner: Joi.string().allow(''),
  ownerAddress: Joi.string().allow(''),
  ownerPhone: Joi.string().allow(''),
  ownerEmail: Joi.string().allow(''),
  circumference: Joi.number().required(),
  height: Joi.number().required(),
  spread1: Joi.number().required(),
  spread2: Joi.number().required(),
  comments: Joi.string().allow(''),
  imagePaths: Joi.array().items(Joi.string()).optional(),
})

const nominationSchema = {
  ...baseSchema,
  isNew: Joi.object({
    commonName: Joi.bool().required(),
    species: Joi.bool().required(),
    genus: Joi.bool().required(),
  }).required(),
}

// const approvalSchema = {
//   ...baseSchema,
//   genusId:
// }
export const formatAndValidateNomination = nomination => {
  const { isNew } = nomination
  const validated = nominationSchema.validate(nomination)
  if (!validated.error) {
    const validatedNom = {
      ...nomination,
      speciesId: isNew.species ? null : nomination.species,
      genusId: isNew.genus ? null : nomination.genus,
      isApproved: false,
      speciesName: isNew.species ? nomination.species : null,
      commonName: isNew.commonName ? nomination.commonName : null,
      genusName: isNew.genus ? nomination.genus : null,
    }
    delete validatedNom.species
    delete validatedNom.genus
    const formattedNom = {}
    Object.keys(validatedNom).forEach(key => {
      formattedNom[key] = validatedNom[key] === '' ? null : validatedNom[key]
    })
    return formattedNom // / consider mutating and returning validated.value instead - not sure
  }
}

export const formatAndValidateApproval = body => {
  const validated = baseSchema.validate(body)
  if (!validated.error) {
    return body
  }
  throw new Error(validated.error.ValidationError)
}

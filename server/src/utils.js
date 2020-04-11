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

export const nominationToTreeMap = (nomination) => {
  console.log(nomination)
  return {
    species: nomination.species, // Look up species code from species table might need nomination.genera to do this too
    k_county: null, // nomination.county @TODO need to lookup county code first,
    k_technique: null, // @TODO Ask aaron where this data comes from
    d_nominated: nomination.createdAt.toString(),
    d_last_measured: nomination.dateMeasured,
    i_circum_inchs: nomination.circumference ? parseInt(nomination.circumference, 10) : null,
    i_height_feet: nomination.height ? parseInt(nomination.height, 10) : null,
    i_spread_feet: null, // @TODO where does this come from (I think multiplying the two spreads?),
    i_points: null, // @TODO calculation for nomination points,
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
    k_user_added: null,
    d_added: Date.now(),
  }
}

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const nominationSchema = Joi.object({
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

export const formatAndValidateNomination = nomination => {
  const validated = nominationSchema.validate(nomination)
  if (!validated.error) {
    const validatedNom = {
      ...nomination,
      speciesId: nomination.species,
      genusId: nomination.genus,
    }
    delete validatedNom.species
    delete validatedNom.commonName
    delete validatedNom.genus
    const formattedNom = {}
    Object.keys(validatedNom).forEach(key => {
      formattedNom[key] = validatedNom[key] === '' ? null : validatedNom[key]
    })
    return formattedNom // / consider mutating and returning validated.value instead - not sure
  }
  throw new Error(validated.error.ValidationError)
}

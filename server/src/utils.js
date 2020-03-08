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
    species: nomination.species,
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

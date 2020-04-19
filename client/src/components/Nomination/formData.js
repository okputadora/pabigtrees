export const fields = ['commonName', 'genus', 'species', 'county', 'nominator', 'address', 'phone', 'email', 'landOwner', 'ownerAddress', 'ownerPhone', 'ownerEmail', 'locationOfTree', 'lon', 'lat', 'measuringCrew', 'measuringTechnique', 'dateMeasured', 'circumference', 'height', 'spread1', 'spread2', 'comments']


export const initialValues = {}

fields.forEach((field) => {
  initialValues[field] = ''
})

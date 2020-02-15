import mongoose from 'mongoose'

const Nomination = new mongoose.Schema({
  commonName: { type: String },
  genus: { type: String },
  species: { type: String },
  county: { type: String },
  nominator: { type: String },
  address: { type: String },
  phone: { type: String },
  email: { type: String },
  landOwner: { type: String },
  ownerAddress: { type: String },
  ownerPhone: { type: String },
  ownerEmail: { type: String },
  locationOfTree: { type: String },
  lon: { type: String },
  lat: { type: String },
  measuringCrew: { type: String },
  dateMeasured: { type: String },
  circumference: { type: String },
  height: { type: Number },
  spread1: { type: Number },
  spread2: { type: Number },
  comments: { type: String },
  imagePaths: [{ type: String }],
  isApproved: { type: Boolean },
}, { timestamps: true })

export default mongoose.model('Nomination', Nomination)

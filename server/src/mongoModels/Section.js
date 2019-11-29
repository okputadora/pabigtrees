import mongoose from 'mongoose'

const { ObjectId } = mongoose.Schema.Types

const Section = new mongoose.Schema({
  component: { type: String },
  index: { type: Number },
  className: { type: String },
  src: { type: String },
  alt: { type: String },
  text: { type: String },
  href: { type: String },
  Page: { type: ObjectId, ref: 'Page' },
}, { timestamps: true })

export default mongoose.model('Section', Section)

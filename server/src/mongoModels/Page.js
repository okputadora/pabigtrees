import mongoose from 'mongoose'

const { ObjectId } = mongoose.Schema.Types

const Page = new mongoose.Schema({
  layout: { type: String },
  column1: [{ type: Number }],
  column2: [{ type: Number }],
  sections: [{ type: ObjectId, ref: 'Section' }],
}, { timestamps: true })

export default mongoose.model('Page', Page)

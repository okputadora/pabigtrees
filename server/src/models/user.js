import { Schema, model } from 'mongoose'

const { ObjectId } = Schema.Types

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: { type: String },
  password: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  googleId: { type: String },
  googleProfilePic: { type: String },
  isAdmin: { type: Boolean, default: false },
  isTrashed: { type: Boolean, default: false },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
  confirmEmailToken: { type: String },
  confirmEmailExpires: { type: Date },
  isEmailConfirmed: { type: Boolean, default: false },
  doForcePasswordChange: { type: Boolean, default: false },
  lastModifiedBy: { type: ObjectId, ref: 'User' },
  confirmEmailDate: { type: Date },
},
{ timestamps: true })

UserSchema.method('authSummary', function authSummary() {
  return {
    _id: this._id,
    isAdmin: this.isAdmin,
  }
})

const User = model('User', UserSchema)


export default User

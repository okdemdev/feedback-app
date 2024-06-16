import mongoose, { Schema } from 'mongoose'

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  profilePic: {
    type: String,
    default: '',
  },
  boards: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Board',
    },
  ],
})

const User = mongoose.model('User', userSchema)

export default User

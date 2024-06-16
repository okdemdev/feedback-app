import mongoose, { Schema } from 'mongoose'

const postSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  board: {
    type: Schema.Types.ObjectId,
    ref: 'Board',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const Post = mongoose.model('Post', postSchema)

export default Post

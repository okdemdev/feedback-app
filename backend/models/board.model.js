import mongoose, { Schema } from 'mongoose'

const boardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Post',
    },
  ],
})

const Board = mongoose.model('Board', boardSchema)

export default Board

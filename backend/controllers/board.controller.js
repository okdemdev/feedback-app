import User from '../models/user.model.js'
import Board from '../models/board.model.js'

export const createBoard = async (req, res) => {
  try {
    const { title, description } = req.body

    if (!title || !description) {
      return res.status(400).json({ error: 'Title and description are required' })
    }

    const username = req.user?.username

    if (!username) {
      return res.status(401).json({ error: 'User not authenticated' })
    }

    const user = await User.findOne({ username })

    if (!user) {
      return res.status(401).json({ error: 'User not authenticated' })
    }

    const newBoard = new Board({
      title,
      description,
      owner: user._id,
    })

    await newBoard.save()

    user.boards.push(newBoard._id)

    await user.save()

    res.status(201).json(newBoard)
  } catch (error) {
    console.error('Error in createBoard controller', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const deleteBoard = async (req, res) => {
  try {
    const { _id } = req.params

    const board = await Board.findOne({ _id: _id })

    if (!board) {
      return res.status(404).json({ error: 'Board not found' })
    }

    await board.deleteOne()

    const userId = req.user._id
    const user = await User.findById(userId)

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    user.boards.pull(board._id)
    await user.save()

    res.status(200).json({ message: 'Board deleted successfully' })
  } catch (error) {
    console.error('Error in deleteBoard controller:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

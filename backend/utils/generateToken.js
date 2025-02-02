import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'

const generateTokenAndSetCookie = async (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: '15d',
  })

  res.cookie('jwt', token, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: 'strict',
  })
}

export default generateTokenAndSetCookie

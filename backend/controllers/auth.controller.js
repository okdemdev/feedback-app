import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
import generateTokenAndSetCookie from '../utils/generateToken.js'

export const signupUser = async (req, res) => {
  try {
    const { username, password, confirmPassword, profilePic } = req.body

    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match' })
    }

    const user = await User.findOne({ username })

    if (user) {
      return res.status(400).json({ error: 'Username already exists' })
    }

    const salt = await bcryptjs.genSalt(10)

    const hashedPassword = await bcryptjs.hash(password, salt)

    const randomProfilePic = 'https://avatar.iran.liara.run/public'

    const newUser = new User({
      username,
      password: hashedPassword,
      profilePic: randomProfilePic,
    })

    if (newUser) {
      generateTokenAndSetCookie(newUser._id, res)
      await newUser.save()

      res.status(201).json({
        _id: newUser._id,
        username: newUser.username,
        profilePic: newUser.profilePic,
      })
    } else {
      res.status(400).json({ error: 'Invalid User Data' })
    }
  } catch (error) {
    console.log('Error in signup controller', error.message)
    res.status(500).json({ error: 'Internal server error' })
  }
}
export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body

    const user = await User.findOne({ username })

    if (!user) {
      return res.status(400).json({ error: 'User does not exist' })
    }

    const isMatch = await bcryptjs.compare(password, user.password)

    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' })
    }

    await generateTokenAndSetCookie(user._id, res)

    res.status(200).json({
      message: 'Login successful',
      user: {
        _id: user._id,
        username: user.username,
        profilePic: user.profilePic,
      },
    })
  } catch (error) {
    console.log('Error in login controller', error.message)
    res.status(500).json({ error: 'Internal server error' })
  }
}
export const logoutUser = (req, res) => {
  try {
    res.cookie('jwt', '', { maxAge: 0 })
    res.status(200).json({ message: 'Logged out succesfully' })
  } catch (error) {
    console.log('Error in logout controller', error.message)
    res.status(500).json({ error: 'Internal server error' })
  }
}

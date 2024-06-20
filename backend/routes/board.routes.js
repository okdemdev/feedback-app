import express from 'express'
import { createBoard, deleteBoard } from '../controllers/board.controller.js'
import protectRoute from '../middleware/protectRoute.js'

const router = express.Router()

router.post('/createboard', protectRoute, createBoard)

router.post('/deleteboard/:_id', protectRoute, deleteBoard)

export default router

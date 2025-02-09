import express from 'express'
import { tokenExtractor } from '../util/token.js'
import { Session, User } from '../models/index.js'
import { validateSession } from '../util/session.js'

const router = express.Router()

router.post('/', [tokenExtractor, validateSession], async (req, res, next) => {
  const user = await User.findByPk(req.decodedToken.id)
  const session = await Session.findOne({ where: { user_id: user.id } })
  await session?.destroy()
  res.sendStatus(200)
})

export default router

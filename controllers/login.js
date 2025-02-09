import express from 'express'
import { Session, User } from '../models/index.js'
import jwt from 'jsonwebtoken'
import { SECRET } from '../util/config.js'
import { throwError } from '../util/helper.js'

const router = express.Router()

router.post('/', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    })

    const isCorrectPassword = req.body.password === 'secret'

    if (!(user && isCorrectPassword)) {
      throwError('invalid username or password', 401)
    }

    if (user.disabled) {
      throwError('account disabled, please contact admin', 401)
    }

    const username = user.username
    const name = user.name
    const user_id = user.id
    const userToken = {
      username,
      id: user_id,
    }
    const token = jwt.sign(userToken, SECRET)

    const session = await Session.findOne({ where: { user_id } })
    if (session) {
      const expires = new Date(Date.now() + 60 * 60 * 1000)
      await session.update({ token, expires })
    } else {
      await Session.create({ token, user_id })
    }
    res.status(200).send({ token, username, name })
  } catch (content) {
    next({ title: 'Login failed', content })
  }
})

export default router

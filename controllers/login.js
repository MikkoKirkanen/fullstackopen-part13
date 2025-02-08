import express from 'express'
import { User } from '../models/index.js'
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
      throwError('invalid username or password')
    }

    const username = user.username
    const name = user.name
    const userToken = {
      username,
      id: user.id,
    }
    const token = jwt.sign(userToken, SECRET)

    res.status(200).send({ token, username, name })
  } catch (content) {
    next({ title: 'Login failed', content })
  }
})

export default router

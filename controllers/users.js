import express from 'express'
import { Blog, User } from '../models/index.js'
import { throwError } from '../util/helper.js'

const router = express.Router()

router.get('/', async (_req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog,
      attributes: { exclude: ['userId'] },
    },
  })
  res.json(users)
})

router.post('/', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    res.json(user)
  } catch (content) {
    content.prefix = 'user.'
    next({ title: 'User creation failed', content })
  }
})

router.put('/:username', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.params.username,
      },
    })
    if (!(user && req.body.username)) {
      throwError(!user ? 'user not found' : 'username cannot be empty')
    }
    user.username = req.body.username
    await user.save()
    res.json(user)
  } catch (content) {
    // const messages = mapAndClearErrors(e.errors, 'user.')
    next({ title: 'User update failed', content })
  }
})

export default router

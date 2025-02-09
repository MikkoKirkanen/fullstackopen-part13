import express from 'express'
import { ReadingLists, User } from '../models/index.js'
import { tokenExtractor } from '../util/token.js'
import { throwError } from '../util/helper.js'

const router = express.Router()

router.get('/', async (_req, res) => {
  const readings = await ReadingLists.findAll({})
  res.json(readings)
})

router.post('/', async (req, res) => {
  const reading = await ReadingLists.create(req.body)
  res.json(reading)
})

router.put('/:id', tokenExtractor, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.decodedToken.id)
    const reading = await ReadingLists.findByPk(req.params.id)
    console.log(user.id, reading.userId)
    if (user?.id != reading.userId) {
      throwError("User cannot set another user's blog readings")
    }
    reading.read = req.body.read
    await reading.save()
    res.json(reading)
  } catch (content) {
    next({ title: 'Reading list update failed', content })
  }
})

export default router

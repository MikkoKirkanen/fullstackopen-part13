import express from 'express'
import { ReadingList, User } from '../models/index.js'
import { tokenExtractor } from '../util/token.js'
import { validateSession } from '../util/session.js'
import { throwError } from '../util/helper.js'

const router = express.Router()

router.get('/', async (_req, res) => {
  const readings = await ReadingList.findAll({})
  res.json(readings)
})

router.post('/', async (req, res) => {
  const reading = await ReadingList.create(req.body)
  res.json(reading)
})

router.put(
  '/:id',
  [tokenExtractor, validateSession],
  async (req, res, next) => {
    try {
      const user = await User.findByPk(req.decodedToken.id)
      const reading = await ReadingList.findByPk(req.params.id)

      if (user?.id != reading.userId) {
        throwError("User cannot set another user's blog readings")
      }

      reading.read = req.body.read
      await reading.save()
      res.json(reading)
    } catch (content) {
      next({ title: 'Reading list update failed', content })
    }
  }
)

export default router

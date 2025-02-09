import express from 'express'
import { Blog } from '../models/index.js'
import { sequelize } from '../util/db.js'

const router = express.Router()

router.get('/', async (_req, res) => {
  const authors = await Blog.findAll({
    attributes: [
      'author',
      [sequelize.fn('COUNT', sequelize.col('title')), 'articles'],
      [sequelize.fn('SUM', sequelize.col('likes')), 'likes'],
    ],
    group: 'author',
    order: [['likes', 'DESC']],
  })
  res.json(authors)
})

export default router

import express from 'express'
import { Blog, User } from '../models/index.js'
import { SECRET } from '../util/config.js'
import { throwError } from '../util/helper.js'
import jwt from 'jsonwebtoken'
import { Op } from 'sequelize'

const router = express.Router()

const blogFinder = async (req, _res, next) => {
  req.blog = await Blog.findByPk(req.params.id)
  if (!req.blog) {
    next({ title: 'Blog not found', messages: 'Malformatted id', code: 404 })
  }
  next()
}

const tokenExtractor = (req, res, next) => {
  const auth = req.get('authorization')
  if (!auth?.toLowerCase().startsWith('bearer ')) {
    next({ title: 'Token missing', code: 401 })
  }
  try {
    req.decodedToken = jwt.verify(auth.slice(7), SECRET)
  } catch {
    next({ title: 'Token invalid', code: 401 })
  }
  next()
}

router.get('/', async (req, res) => {
  const blogs = await Blog.findAll({
    include: {
      model: User,
    },
    where: {
      [Op.or]: [
        {
          title: {
            [Op.iLike]: `%${req.query.search ?? ''}%`,
          },
        },
        {
          author: {
            [Op.iLike]: `%${req.query.search ?? ''}%`,
          },
        },
      ],
    },
    order: [['likes', 'DESC']],
  })
  res.json(blogs)
})

router.get('/:id', blogFinder, async (req, res) => {
  res.json(req.blog)
})

router.post('/', tokenExtractor, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.decodedToken.id)
    const blog = await Blog.create({
      ...req.body,
      userId: user.id,
      date: new Date(),
    })
    res.json(blog)
  } catch (content) {
    content.prefix = 'blog.'
    next({ title: 'Blog creation failed', content })
  }
})

router.put('/:id', blogFinder, async (req, res, next) => {
  try {
    req.blog.likes = req.body.likes
    await req.blog.save()
    res.json(req.blog)
  } catch (content) {
    next({ title: 'Blog update failed', content })
  }
})

router.delete('/:id', tokenExtractor, blogFinder, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.decodedToken.id)
    if (user?.id != req.blog.userId) {
      throwError("User cannot delete another user's blog")
    }
    await req.blog.destroy()
    res.json(req.blog)
  } catch (content) {
    next({ title: 'Blog deletion failed', content })
  }
})

export default router

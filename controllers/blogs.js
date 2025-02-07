import express from 'express'
import { Blog } from '../models/index.js'

const router = express.Router()

const blogFinder = async (req, _res, next) => {
  req.blog = await Blog.findByPk(req.params.id)
  if (!req.blog) {
    next({ title: 'Blog not found', messages: 'Malformatted id' })
  }
  next()
}

router.get('/', async (req, res) => {
  const blogs = await Blog.findAll()
  res.json(blogs)
})

router.get('/:id', blogFinder, async (req, res) => {
  res.json(req.blog)
})

router.post('/', async (req, res, next) => {
  try {
    const blog = await Blog.create(req.body)
    res.json(blog)
  } catch (error) {
    const messages = error.errors.map((e) => {
      if (e.message.startsWith('blog.')) {
        // Remove 'blog.' from string
        const msg = e.message?.slice(5)
        // Capitalize the first letter
        return msg.charAt(0).toUpperCase() + msg.slice(1)
      } else {
        return e.message
      }
    })
    next({ title: 'Blog creation failed', messages })
  }
})

router.put('/:id', blogFinder, async (req, res, next) => {
  try {
    req.blog.likes = req.body.likes
    await req.blog.save()
    res.json(req.blog)
  } catch (error) {
    next({ title: 'Blog update failed', error })
  }
})

router.delete('/:id', blogFinder, async (req, res, next) => {
  try {
    await req.blog.destroy()
    res.json(req.blog)
  } catch (error) {
    next({ title: 'Blog deletion failed', error })
  }
})

export default router

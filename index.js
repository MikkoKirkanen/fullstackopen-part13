import 'dotenv/config'
import { Sequelize, QueryTypes, Model, DataTypes } from 'sequelize'
import express from 'express'

const app = express()
app.use(express.json())
const sequelize = new Sequelize(process.env.DATABASE_URL)

class Blog extends Model {}
Blog.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    author: {
      type: DataTypes.TEXT,
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'blog',
  }
)

// Blog.sync()

app.get('/api/blogs', async (req, res) => {
  const blogs = await Blog.findAll()
  res.json(blogs)
})

app.get('/api/blogs/:id', async (req, res) => {
  const blog = await Blog.findByPk(req.params.id)
  if (blog) {
    res.json(blog)
  } else {
    res.sendStatus(404)
  }
})

app.post('/api/blogs', async (req, res) => {
  console.log(req.body)
  try {
    const blog = await Blog.create({
      author: 'Mikko',
      url: 'test-url',
      title: 'Blog title',
    })
    res.json(blog)
  } catch (error) {
    res.status(404).json({ error })
  }
})

app.delete('/api/blogs/:id', async (req, res) => {
  const blog = await Blog.findByPk(req.params.id)
  await blog.destroy()
  if (blog) {
    res.json(blog)
  } else {
    res.sendStatus(404)
  }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

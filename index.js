import express from 'express'
import blogsRouter from './controllers/blogs.js'
import { connectToDatabase } from './util/db.js'
import { PORT } from './util/config.js'
import { errorHandler } from './util/errorHandler.js'

const app = express()
app.use(express.json())
app.use('/api/blogs', blogsRouter)

app.use(errorHandler)

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()

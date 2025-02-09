import express from 'express'
import blogsRouter from './controllers/blogs.js'
import usersRouter from './controllers/users.js'
import loginRouter from './controllers/login.js'
import authorsRouter from './controllers/authors.js'
import readinglistsRouter from './controllers/reading_lists.js'
import { errorHandler } from './util/errorHandler.js'
import { connectToDatabase } from './util/db.js'
import { PORT } from './util/config.js'

const app = express()
app.use(express.json())
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/authors', authorsRouter)
app.use('/api/readinglists', readinglistsRouter)

app.use(errorHandler)

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()

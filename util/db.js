import { Sequelize } from 'sequelize'
import { DATABASE_URL } from './config.js'

const sequelize = new Sequelize(DATABASE_URL)

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate()
    console.log('Connected to the database')
  } catch (error) {
    console.log('Failed to connect to the database', error)
    return process.exit(1)
  }

  return null
}

export { connectToDatabase, sequelize }

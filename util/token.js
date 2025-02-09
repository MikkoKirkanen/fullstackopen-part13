import { SECRET } from './config.js'
import jwt from 'jsonwebtoken'

export const tokenExtractor = (req, res, next) => {
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

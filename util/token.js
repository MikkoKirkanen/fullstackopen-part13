import { SECRET } from './config.js'
import jwt from 'jsonwebtoken'

export const tokenExtractor = (req, _res, next) => {
  const auth = req.get('authorization')
  if (!auth?.toLowerCase().startsWith('bearer ')) {
    next({ title: 'Token missing', code: 401 })
  }
  try {
    req.token = auth.slice(7)
    req.decodedToken = jwt.verify(req.token, SECRET)
  } catch {
    next({ title: 'Token invalid', code: 401 })
  }
  next()
}

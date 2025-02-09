import { Session } from '../models/index.js'
import { throwError } from './helper.js'

export const validateSession = async (req, _res, next) => {
  try {
    const session = await Session.findOne({
      where: {
        token: req.token,
      },
    })
    if (!session) {
      throwError('No session exists', 401)
    }
    if (session.token != req.token) {
      throwError('Token is invalid', 401)
    }
    const expires = new Date(session.expires)
    if (expires < new Date()) {
      throwError('Token is expired', 401)
    }
  } catch (content) {
    next({ title: 'Session error', content })
  }
  next()
}
